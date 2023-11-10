import TaskModel from '../models/taskSchema.js';

export const getTasks = async (_, res) => {
  try {
    const data = await TaskModel.find({});
    const filteredData = data
      .filter((user) => user._doc.isActive === true)
      .map((user) => ({
        ...user._doc,
        isActive: undefined,
      }));

    res.json({ data: filteredData, message: 'Usuarios encontrados' });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      data: null,
      message: 'Ocurrió un error a la DB',
    });
  }
};

export const postTask = async (req, res) => {
  const { body } = req;

  const newTask = new TaskModel({
    title: body.title,
    description: body.description,
    isActive: true,
  });

  try {
    await newTask.save();

    res.status(201).json({
      data: null,
      message: 'Tarea creada exitosamente',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'El titulo ya está en uso',
      });
      return;
    }

    res.status(500).json({
      data: null,
      message: 'Ocurrio un error guardando la tarea',
    });
  }
};

export const putTask = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const action = await TaskModel.updateOne({ _id: id }, body);

    if (action.modifiedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No se encontro una tarea con ese id',
      });
      return;
    }

    res.json({
      data: null,
      message: 'La tarea fue actualizada con exito',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'El titulo ya está en uso',
      });
      return;
    }

    res.status(500).json({
      data: null,
      message: 'Ocurrio un error actualizando la tarea',
    });
  }
};

export const deleteTask = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const action = await TaskModel.updateOne({ _id: id }, { isActive: false });

    if (action.modifiedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No se encontro una tarea con ese id',
      });
      return;
    }

    res.json({
      data: null,
      message: 'La tarea fue eliminada con exito',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrio un error eliminando la tarea',
    });
  }
};
