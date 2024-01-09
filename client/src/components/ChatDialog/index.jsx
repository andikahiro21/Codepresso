import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Dialog } from '@mui/material';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Window } from 'stream-chat-react';
import { selectTokenChat } from '@pages/ActiveOrder/selectors';
import { getTokenChat } from '@pages/ActiveOrder/actions';
import config from '@config/index';
import { selectToken } from '@containers/Client/selectors';
import { jwtDecode } from 'jwt-decode';
import { StreamChat } from 'stream-chat';
import classes from './style.module.scss';
import 'stream-chat-react/dist/css/v2/index.css';

// ... (imports remain unchanged)

const ChatDialog = ({ open, onClose, tokenChat, token, items }) => {
  const dispatch = useDispatch();
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getTokenChat());

        if (tokenChat && token && items) {
          const newClient = StreamChat.getInstance(config.stream.streamKey);

          const decodedToken = jwtDecode(token);

          newClient.connectUser(
            {
              id: JSON.stringify(decodedToken?.data?.id),
              name: decodedToken?.data?.full_name,
              image: decodedToken?.data?.image,
            },
            tokenChat
          );

          setClient(newClient);

          const newChannel = newClient.channel('messaging', `${items?.user_id}-${items?.driver_id}`, {
            members: [JSON.stringify(items?.user_id), JSON.stringify(items?.driver_id)],
          });

          setChannel(newChannel);
          setDecoded(decodedToken);
        }
      } catch (err) {
        setError(err.message || 'An error occurred while setting up Stream Chat.');
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [dispatch, tokenChat, token, items, client]);

  return (
    <Dialog
      open={open}
      fullWidth="xl"
      maxWidth="md"
      keepMounted
      onClose={() => {
        setError(null);
        onClose();
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      {error && <div>Error: {error}</div>}
      {open && client && channel && (
        <div className={classes.chatWrapper}>
          <Chat client={client}>
            <Channel channel={channel}>
              <Window>
                <ChannelHeader />
                <div className={classes.listWrapper}>
                  <MessageList />
                </div>
                <div className={classes.inputWrapper}>
                  <MessageInput />
                </div>
              </Window>
            </Channel>
          </Chat>
        </div>
      )}
    </Dialog>
  );
};

ChatDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  tokenChat: PropTypes.string,
  token: PropTypes.string,
  items: PropTypes.object,
  decoded: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  tokenChat: selectTokenChat,
  token: selectToken,
});

export default connect(mapStateToProps)(ChatDialog);
