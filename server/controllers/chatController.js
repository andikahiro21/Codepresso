const {
  handleServerError,
  handleClientError
} = require('../helpers/handleError');
const handleResponseSuccess = require('../helpers/responseSuccess');
const { chatStreamClient } = require('../utils/streamChatUtil');
const { Users } = require('../models');

exports.token = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id);
    const token = chatStreamClient.createToken(id.toString());
    return handleResponseSuccess(res, 200, 'success', { token: token });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.createChannels = async (req, res) => {
  try {
    const { userId, driverId } = req.body;

    if (userId === driverId) {
      return handleClientError(
        res,
        400,
        'User ID and Driver ID cannot be the same'
      );
    }

    const isExistUser = await Users.findOne({ where: { id: userId, role: 2 } });
    const isExistDriver = await Users.findOne({
      where: { id: driverId, role: 3 }
    });

    if (!isExistUser || !isExistDriver) {
      return handleClientError(res, 404, 'User or Driver not found');
    }

    const channel = chatStreamClient.channel(
      'messaging',
      `${userId}-${driverId}`,
      {
        members: [userId.toString(), driverId.toString()],
        created_by_id: driverId.toString()
      }
    );
    await channel.create();

    return handleResponseSuccess(res, 201, 'Channel created');
  } catch (error) {
    return handleServerError(res);
  }
};

exports.deleteChannel = async (req, res) => {
  try {
    const { userId, driverId } = req.body;

    console.log(userId);
    const filter = {
      cid: `messaging:${userId}-${driverId}`
    };
    const isExistChannel = await chatStreamClient.queryChannels(filter);
    if (isExistChannel.length === 0)
      return handleClientError(res, 404, 'Channel Not Found');

    await chatStreamClient.deleteChannels([`messaging:${userId}-${driverId}`]);
    return handleResponseSuccess(res, 200, 'Channel Successfully Deleted');
  } catch (error) {
    return handleServerError(res);
  }
};
