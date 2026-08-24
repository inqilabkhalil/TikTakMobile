import { useCallback, useRef, useState } from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../constants/theme';
import { gapHorizontal, gapVertical, pixelHeight, pixelWidth } from '../../utils/metrics';
import type { CampaignCarouselProps } from '../../types/campaignCarousel';

const CARD_WIDTH = pixelWidth(345);
const CARD_HEIGHT = pixelHeight(160);
const CARD_GAP = gapHorizontal(8);

function CampaignCarousel({
  campaigns,
  onPress,
  fallbackImage,
  fallbackTitle = 'MEYVƏLƏRƏ',
  fallbackSubtitle = 'HƏFTƏ SONUNA KİMİ 20% ENDİRİM',
}: CampaignCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_GAP));
    setActiveIndex(index);
  }, []);

  if (campaigns.length === 0) {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={[styles.card, styles.cardOverlay]}
          activeOpacity={0.9}
          onPress={() => onPress?.()}>
          {fallbackImage ? (
            <Image source={fallbackImage} style={styles.fallbackImage} resizeMode="cover" />
          ) : null}
          <View style={styles.overlay} />
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{fallbackTitle}</Text>
            <Text style={styles.subtitle}>{fallbackSubtitle}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_GAP}
        snapToAlignment="start"
        directionalLockEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}>
        {campaigns.map(campaign => (
          <TouchableOpacity
            key={campaign.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => onPress?.(campaign)}>
            <Image source={{ uri: campaign.img_url }} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay} />
            <View style={styles.textWrapper}>
              <Text style={styles.title} numberOfLines={2}>
                {campaign.title}
              </Text>
              {campaign.description ? (
                <Text style={styles.subtitle} numberOfLines={2}>
                  {campaign.description.replace(/\n/g, ' ')}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {campaigns.length > 1 && (
        <View style={styles.dots}>
          {campaigns.map((c, index) => (
            <View key={c.id} style={[styles.dot, index === activeIndex && styles.dotActive]} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: pixelHeight(16),
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: pixelWidth(14),
    overflow: 'hidden',
    backgroundColor: COLORS.bannerPurple,
    marginRight: CARD_GAP,
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    alignSelf: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  fallbackImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  textWrapper: {
    padding: gapHorizontal(16),
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    lineHeight: 18,
    color: COLORS.white,
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    lineHeight: 14,
    color: COLORS.white,
    marginTop: pixelHeight(4),
    opacity: 0.9,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: gapVertical(8),
    gap: gapHorizontal(6),
  },
  dot: {
    width: pixelWidth(6),
    height: pixelWidth(6),
    borderRadius: pixelWidth(3),
    backgroundColor: COLORS.border,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: pixelWidth(16),
  },
});

export default CampaignCarousel;
