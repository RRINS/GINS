import { mergeStyles } from '@fluentui/merge-styles';

const helloStyle = mergeStyles({
  color: 'blue',
});

export const HardwareView = () => (
  <>
    <h1 className={helloStyle}>Hello!</h1>
    <h1>Test!</h1>
  </>
);
