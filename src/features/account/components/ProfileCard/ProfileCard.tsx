import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { ProfileCardProps } from '../../types/account';
import AvatarDefault from '../../../../shared/assets/images/avatar.svg';
import {
  gapVertical,
  pixelFont,
  pixelHorizontal,
  pixelVertical,
} from '../../../../shared/utils/metrics';
import { COLORS } from '../../../../shared/constants/theme';
import { useAvatarPicker } from '../../hooks/useAvatarPicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
function ProfileCard({ fullName, phone, imgUrl, onAvatarChange }: ProfileCardProps) {
  const { avatarUri, pickAvatar } = useAvatarPicker(imgUrl, onAvatarChange);
  const avatarSize = pixelHorizontal(152);

  return (
    <View style={styles.container}>
      <TouchableOpacity
      activeOpacity={0.85}
      onPress={pickAvatar}
      style={styles.avatarWrapper}
      >
        {avatarUri ? (
          <FastImage
          source={{ uri: avatarUri }}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          }}
          />
        ) : (
          <AvatarDefault
          width={avatarSize}
          height={avatarSize}
        />
        )}
        <View style={styles.cameraBadge}>
          <Ionicons name='camera' size={pixelHorizontal(20)} color={COLORS.white}/>
        </View>
        </TouchableOpacity>

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
    position: 'relative',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: pixelVertical(4),
    right: pixelHorizontal(4),
    backgroundColor: COLORS.primary,
    width: pixelHorizontal(40),
    height: pixelHorizontal(40),
    borderRadius: pixelHorizontal(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
    elevation: 4,
    shadowColor: COLORS.labelText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
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
