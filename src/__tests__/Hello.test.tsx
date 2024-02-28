import {render, screen} from '@testing-library/react-native';
import {Text} from 'react-native';

export default function Hello() {
  return <Text>Hello, world!</Text>;
}

describe('Hello', () => {
  it('renders the correct message', () => {
    render(<Hello />);
    expect(screen.getByText('Hello, world!')).toBeVisible();
  });
});
