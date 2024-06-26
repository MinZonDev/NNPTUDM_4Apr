let { check } = require('express-validator');
let util = require('node:util')
let option = {
    password: {
        minLength: 6,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1
    },
    username: {
        max: 42,
        min: 6
    }
}
module.exports = {
    checkChain: function () {
        return [
            check("password", util.format("password phai dai it nhat %d ki tu, %d chu in hoa, %d chu thuong,%d so", option.password.minLength, option.password.minSymbols, option.password.minUppercase, option.password.minLowercase, option.password.minNumbers)).isStrongPassword(option.password),
            check('email', "email dung dinh dang").isEmail(),
            check('username', "user phai dai tu %d den %d ki tu").isLength(option.username),
            check('role', "role khong hop le").isIn(["user", "admin", "publisher"])
        ]
    },

    checkForgotPassword: function () {
        return [
            check('email', 'Email không hợp lệ').isEmail()
        ];
    },

    // Thêm validation cho Reset Password
    checkResetPassword: function () {
        return [
            check('password', 'Mật khẩu mới không đủ mạnh').isStrongPassword()
        ];
    },

    checkChangePassword: function () {
        return [
            check("oldPassword").notEmpty().withMessage("Mật khẩu cũ không được để trống"),
            check("newPassword").isStrongPassword().withMessage("Mật khẩu mới không đủ mạnh")
        ];
    }
}