import { createParamDecorator } from '@nestjs/common';

export const AuthUserId = createParamDecorator((param, req) => {
    return  req.user.id;
});
