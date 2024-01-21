import axios from 'axios';
import TokensModel from '../models/tokens.model';
import { google } from 'googleapis';
import UserInfoModel from '../models/user-info.model';

export default class OAuthAuthorizationService {
    public static oauth2Client: any;
    public authorizeUser(scopes: string[]): string {
        console.log('User Authorization Process Initiated!');
        try{
            OAuthAuthorizationService.oauth2Client = new google.auth.OAuth2(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                process.env.REDIRECT_URL
            );
        } catch(error) {
            throw new Error('Error occurred while initiating OAuth2.0 Client Instance!');
        }
        let authorizationUrl: string;
        try {
            const scopeURLs: string[] = scopes.map((scope: string) => `${process.env.SCOPE_BASE_URL}/userinfo.${scope}`);
            authorizationUrl = OAuthAuthorizationService.oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopeURLs,
                include_granted_scopes: true
            });
        } catch(error) {
            throw new Error('Error occurred while generating Authorization URL!');
        }
        console.log('Authorization URL successfully generated!');
        return authorizationUrl;
    }

    public async generateTokens(q: any): Promise<TokensModel> {
        console.log('Generating Tokens...');
        let tokens: TokensModel;
        try {
            const response = await OAuthAuthorizationService.oauth2Client.getToken(q.code);
            tokens = response.tokens;
            OAuthAuthorizationService.oauth2Client.setCredentials(tokens);
        } catch (error) {
            throw new Error('Error occurred while generating Tokens!');
        }
        console.log('Tokens successfully Generated');
        console.log(tokens);
        return tokens;
    }

    public async getUserInfo(tokens: TokensModel): Promise<UserInfoModel> {
        console.log('Fetching User Profile Info...');
        const url: string = process.env.USER_INFO_URL as string;
        let userInfo: UserInfoModel;
        try {
            const response = await axios.get(url, {
              headers: {
                'Authorization': `Bearer ${tokens.access_token}`,
              },
            });
            userInfo = response.data;
        } catch (error) {
            throw new Error('Error fetching User Info');
        }
        console.log('User Info Fetched Successfully!');
        return userInfo;
    }
}
