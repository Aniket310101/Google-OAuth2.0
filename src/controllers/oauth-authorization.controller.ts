import { Request, Response } from 'express';
import OAuthAuthorizationService from '../services/oauth-authorization.service';
import TokensModel from '../models/tokens.model';
import url from 'url';
import UserInfoModel from '../models/user-info.model';

export default class OauthAuthorizationController {
    public authorizeUser(req: Request, res: Response) {
        const scopes = (req.query.scopes as string).split(',');
        const authorizationUrl = new OAuthAuthorizationService().authorizeUser(scopes);
        console.log('Redirect to User Consent Screen!');
        res.redirect(authorizationUrl);
    }

    public async generateTokens(req: Request, res: Response) {
        const q = url.parse(req.url, true).query;
        const tokens: TokensModel = await new OAuthAuthorizationService().generateTokens(q);
        const userInfo: UserInfoModel = await new OAuthAuthorizationService().getUserInfo(tokens);
        res.send(userInfo);
    }
}