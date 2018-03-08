import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import './Hello.scss';

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
    <div className='hello'>
      <div className='greeting'>
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
      <div>
        <RaisedButton label='-' onClick={onDecrement} />
        <RaisedButton label='+' onClick={onIncrement} />
      </div>
    </div>
  );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
