exports.httpStatusCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NOT_SUCCESSFULL: 220,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
};

exports.message = {
  CHALLAN_STATUS_UPDATED: "Challan status has been updated",
  CHALLANS_GENERATED: "Challans has been generated",
  CLASS_CREATED: "Class has been created successfully",
  CLASS_ALREADY_EXISTS: "Class already exists",
  STUDENT_NOT_ADDED: "Unable to add student",
  STUDENT_ADDED: "Student has been added successfully!",
  INTERNAL_SERVER_ERROR: "Internal server error!",
  FAILED_TO_SAVE_USER: "Failed to save user!",
  USER_REGISTERED: "User registered successfully!",
  USER_ALREADY_EXISTS: "User already exists!",
  CODE_MISMATCH: "Code mismatch!",
  FAILED_TO_CONFIRM_USER: "Failed to confirm user!",
  FAILED_TO_UPDATE_USER: "Failed to update user!",
  EXPIRE_CODE: "Code Expired!",
  USER_LOGGEDIN: "User logged in successfully!",
  FAILED_TO_LOG_IN: "Failed to log in!",
  ACCESS_TOKEN_EXPIRED: "Access token expired!",
  INVALID_ACCESS_TOKEN: "Invalid access token!",
  TOKEN_NOT_EXIST: "Access token not found!",
  PASSWORD_CHANGED: "Password changed successfully!",
  FAILED_TO_CHANGE_PASSWORD: "Failed to change password!",
  CODE_SENT: "Verification code has been send!",
  RESENT_CODE: "Verification code resent successfully!",
  FAILED_TO_SEND_CODE: "Failed to send verification code!",
  IMAGE_UPLOADING_ERROR: "There was an error uploading your photo: ",
  IMAGE_DELETING_ERROR: "There was an error deleting your photo: ",
  IMAGE_DELETED: "Photo deleted successfully!",
  FILE_DELETE: "File deleted successfully",
  ACL: "public-read",
  NOT_FOUND: "NotFound",
  BUCKET_ALREADY_OWNED_BY_YOU: "BucketAlreadyOwnedByYou",
  CREDIT_CARD_UPLOAD_ERROR:
    "Please select front or back photos of Credit Card!",
  FAILED_BNPL_REQUEST: "Failed to apply for BNPL",
  BNPL_REQUEST_EXISTS: "BNPL request of this amount already exists!",
  BNPL_REQUEST_NOT_APPROVED: "Your first BNPL request is not approved yet!",
  USER_NOT_FOUND: "User not found",
  BNPL_NOT_FOUND: "BNPL request not found",
  NO_PENDING_BNPL_REQ_FOUND: "No pending BNPL request found!",
  FAILED_TO_FIND_USER: "Failed to find user",
  YOU_HAVE_APPLIED_FOR_BNPL: "You have Applied for BNPL",
  YOU_HAVE_UPADTED_YOUR_CONTACT_NUMBER: "You have updated your contact number",
  YOU_HAVE_UPADTED_YOUR_ADDRESS: "You have updated your address",
  YOU_HAVE_UPADTED_YOUR_DELIVERY_ADDRESS:
    "You have updated your delivery address",
  CONTACT_NUMBER_UPDATED: "Your contact number has been updated",
  ADDRESS_UPDATED: "Your address has been updated",
  DELIVERY_ADDRESS_UPDATED: "Your delivery address has been updated",
  FAILED_TO_UPDATE_USER_CONTACT_NUMBER: "Failed to update user contact number",
  FAILED_TO_UPDATE_USER_ADDRESS: "Failed to update user address",
  FAILED_TO_UPDATE_USER_DELIVERY_ADDRESS:
    "Failed to update user delivery address",
  CREDIT_CARD_DETAILS: "Credit Card Details has been added!",
  YOU_HAVE_ADDED_CREDIT_CARD_DETAILS: "You have added your credit card details",
  FAILED_TO_SAVE_CREDIT_CARD_DETAILS: "Failed to save credit card details",
  USER_DELETED: "User deleted successfully",
};

exports.type = {
  FORGOT_PASSWORD: "forgot password",
  BNPL: "bnpl",
  PROFILE: "profile",
};

exports.string = {
  BUCKET_NAME: "atpay-bucket",
  PHOTO_URL: "photo/",
  CC_URL: "cc/",
};

exports.exception = {
  CODE_MISTMATCH: "CodeMismatchException",
  EXPIRE_CODE: "ExpiredCodeException",
  INVALID_PASSWORD: "InvalidPasswordException",
  LIMIT_EXCEEDED: "LimitExceededException",
  INVALID_PARAM: "InvalidParameterException",
};

exports.action = {
  CREATED: "created",
  UPDATED: "updated",
  DELETED: "deleted",
};

exports.status = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};
