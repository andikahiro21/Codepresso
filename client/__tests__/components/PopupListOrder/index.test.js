import PopupListOrder from '@components/PopupListOrder';
import { render } from '@utils/testHelper';

let wrapper;
let isOpen = true;

const mockProps = {
  open: isOpen,
  handleClose: () => {
    isOpen = false;
  },
  items: [
    {
      Bean: {
        createdAt: '2023-12-08T07:19:54.000Z',
        id: 1,
        menu_id: 1,
        name: 'Arabica',
        price: 0,
        updatedAt: '2023-12-08T07:19:54.000Z',
      },
      Milk: {
        createdAt: '2023-12-08T07:19:54.000Z',
        id: 2,
        menu_id: 1,
        name: 'Oat Milk',
        price: 5000,
        updatedAt: '2023-12-08T07:19:54.000Z',
      },
      Size: {
        createdAt: '2023-12-08T07:19:54.000Z',
        id: 2,
        menu_id: 1,
        name: 'Large',
        price: 7000,
        updatedAt: '2023-12-08T07:19:54.000Z',
      },
      Sugar: {
        createdAt: '2023-12-08T07:19:54.000Z',
        id: 2,
        menu_id: 1,
        name: 'Normal Sugar',
        price: 0,
        updatedAt: '2023-12-08T07:19:54.000Z',
      },
      bean_id: 1,
      createdAt: '2023-12-10T14:41:16.000Z',
      id: 55,
      menu_id: 1,
      menu_purchase: {
        category_id: 2,
        createdAt: '2023-12-07T14:58:23.000Z',
        description:
          'Caffe latte, often referred to as simply "latte," is a creamy and comforting coffee beverage made by combining a shot of espresso with steamed milk. It offers a perfect balance between the rich flavors of espresso and the smoothness of milk, making it a popular choice among coffee enthusiasts worldwide.',
        id: 1,
        image: 'https://res.cloudinary.com/dem9rzjbs/image/upload/v1701961102/images/bysgz0k8huekxhmogoaj.png',
        name: 'Caffe Latte',
        price: 24000,
        qty: 1,
        type: 'Beverage',
        updatedAt: '2023-12-07T14:58:23.000Z',
      },
      milk_id: 2,
      price: 108000,
      purchase_group_id: 20,
      qty: 3,
      size_id: 2,
      sugar_id: 2,
      updatedAt: '2023-12-10T14:41:16.000Z',
      user_id: 2,
    },
  ],
};

beforeEach(() => {
  wrapper = render(
    <PopupListOrder open={mockProps.open} handleClose={mockProps.handleClose} items={mockProps.items} />
  );
});

describe('Popup List Order Component', () => {
  it('should render the component correctly', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('popupListOrder')).toBeInTheDocument();
  });

  it('should match with snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
