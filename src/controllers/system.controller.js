import { asyncHandler } from '../utils/asynchandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { DisconnectLog } from '../models/connectionLogsModal.js';


const getDisconnectCounts = asyncHandler(async (req, res) => {
    try {
        let startDate = req.body.start_date || "";
        let endDate = req.body.end_date || "";

        let commonCondition = {}
        if (startDate && endDate) commonCondition['disconnect_time'] = { $gte: new Date(startDate), $lte: new Date(endDate) }

        let result = await DisconnectLog.aggregate([
            { $match: commonCondition },
            {
                $group: {
                    _id: '$computer_name',
                    disconnectCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    computer_name: '$_id',
                    disconnectCount: 1
                }
            },
            { $sort: { disconnectCount: -1 } }
        ]);

        return res
            .status(200)
            .json(new ApiResponse(200, result))
    } catch (error) {
        console.error("error:", error);
        throw new ApiError(400, "something went wrong")
    }

});

export {
    getDisconnectCounts
}