import PopupMessage from '@components/PopupMessage/Dialog';
import { render } from '@utils/testHelper';

let wrapper;
let isOpen = true;

const mockProps = {
  open: isOpen,
  titleId: 'app_lang_id',
  messageId: 'app_popup_error_message',
  onClose: () => {
    isOpen = false;
  },
};
beforeEach(() => {
  wrapper = render(
    <PopupMessage
      open={mockProps.open}
      titleId={mockProps.titleId}
      messageId={mockProps.messageId}
      onClose={mockProps.onClose}
    />
  );
});

describe('Popup Message Component', () => {
  it('should render the component correctly', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('popupMessage')).toBeInTheDocument();
  });

  it('should match with snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
