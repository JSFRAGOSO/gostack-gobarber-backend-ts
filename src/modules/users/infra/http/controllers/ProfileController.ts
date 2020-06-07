import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfileService = container.resolve(ShowProfileService);
        const { id } = request.user;

        const user = await showProfileService.execute({ user_id: id });
        delete user.password;
        return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateProfile = container.resolve(UpdateProfileService);
        const { email, name, password, old_password } = request.body;
        const { id } = request.user;

        const user = await updateProfile.execute({
            user_id: id,
            email,
            name,
            password,
            old_password,
        });

        delete user.password;
        return response.json(user);
    }
}

export default new ProfileController();
