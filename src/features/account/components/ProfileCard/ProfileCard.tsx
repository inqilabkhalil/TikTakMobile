import { Image, StyleSheet, Text, View } from 'react-native';
import { ProfileCardProps } from '../../types/account';
import AvatarDefault from '../../../../shared/assets/images/avatar.svg';
import {
  gapVertical,
  pixelFont,
  pixelHorizontal,
  pixelVertical,
} from '../../../../shared/utils/metrics';
import { COLORS } from '../../../../shared/constants/theme';
function ProfileCard({ fullName, phone, imgUrl }: ProfileCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        {imgUrl ? (
          <Image
          source={{ uri: imgUrl }}
          style={{
            width: pixelHorizontal(152),
            height: pixelHorizontal(152),
            borderRadius: pixelHorizontal(76),
          }}
          />
        ) : (
          <AvatarDefault
          width={pixelHorizontal(152)}
          height={pixelHorizontal(152)}
        />
        )}
      </View>
      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.phone}>{phone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: gapVertical(20),
  },
  avatarWrapper: {
    marginBottom: gapVertical(12),
  },
  name: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(16),
    paddingTop: pixelVertical(16),
    fontWeight: '500',
    lineHeight: pixelFont(16),
    letterSpacing: 0,
    color: COLORS.textDark,        
  },
  phone: {
    fontSize: pixelFont(14),
    fontWeight: '300',
    lineHeight: pixelFont(14),
    paddingTop: pixelVertical(6),
    letterSpacing: 0,
    color: COLORS.textDark,        
    marginTop: gapVertical(4),
  },
});

export default ProfileCard;
