import { asyncHandler } from '../utils/asynchandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
// import { DisconnectLog } from '../models/connectionLogsModal.js';

import { parseLogFiles } from '../utils/logParser.js';

const getDisconnectLogs = asyncHandler(async (req, res) => {
    try {
        let startDate = req.query.start_date || "";
        let endDate = req.query.end_date || "";

        const data = await parseLogFiles(startDate, endDate);
        console.log("data----", data);
        return res
            .status(200)
            .json(new ApiResponse(200, data))
    } catch (error) {
        console.error('Error reading logs:', error.message);
        throw new ApiError(400, "Unable to process log files")
    }
});


export {
    getDisconnectLogs,
    // getDisconnectCounts
}