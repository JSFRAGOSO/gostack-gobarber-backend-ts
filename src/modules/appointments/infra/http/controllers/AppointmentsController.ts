import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { classToClass } from 'class-transformer';

class AppointmentController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;
        const user_id = request.user.id;

        const createAppointmentService = container.resolve(
            CreateAppointmentService,
        );

        const appointment = await createAppointmentService.execute({
            date,
            provider_id,
            user_id,
        });
        return response.json(classToClass(appointment));
    }
}

export default new AppointmentController();
