import AntButton from '@ant-design/react-native/lib/button';
import type { ButtonProps } from '../../types/button';

function Button({
  title,
  onPress,
  type = 'primary',
  loading = false,
  disabled = false,
}: ButtonProps) {
  return (
    <AntButton
      type={type}
      loading={loading}
      disabled={disabled}
      onPress={onPress}>
      {title}
    </AntButton>
  );
}

export default Button;
