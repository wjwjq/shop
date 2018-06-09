import * as React from 'react';
import CSSModules from 'react-css-modules';
import * as styles from './style.less';

export interface IProps {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement }: IProps) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <div className={styles.hello}>
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
      <div>
        <button className={styles.button} onClick={onDecrement}>-</button>
        <button className={styles.button} onClick={onIncrement}>+</button>
      </div>
    </div>
  );
}

export default CSSModules(Hello, styles);

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
