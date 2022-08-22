import Role from '../model/Role';

const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;
        const values = await Promise.all(
            new Role({name: 'Student'}).save(),
            new Role({name: 'Coordinator'}).save(),
            new Role({name: 'Administrator'}).save()
        );
        console.log(values);
    } catch (error) {
        console.log(error);
    }
}

export default createRoles;
