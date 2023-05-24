export const ADD_OBJECT = {
    0: {
        step: 0,
        name: 'add_object',
        field: 'address',
        message: 'Введите адрес объекта 🗺️',
        type: 'text'
    },
    1: {
        step: 1,
        field: 'customer',
        message: 'Введите название заказчика 🏗️',
        type: 'text'
    },
    2: {
        step: 2,
        name: 'add_object',
        field: 'supervisor',
        message: 'Фамилия ответственного прараба на объекте 👷',
        type: 'text'
    },
    3: {
        step: 3,
        name: 'add_object',
        field: 'receiver',
        message: 'Кому сдавать объект 🥸️',
        type: 'text'
    },
}

export const ADD_TOOL = {
    0: {
        step: 0,
        name: 'add_tool',
        field: 'name',
        message: 'Введите название инструмента 🛠️️',
        type: 'text'
    },
    1: {
        step: 1,
        name: 'add_tool',
        field: 'article',
        message: 'Введите инвертарный номер 🆔',
        type: 'text'
    },
    2: {
        step: 2,
        name: 'add_tool',
        field: 'objectId',
        message: 'Выберите объект, на котором находится инструмент 🏗️',
        type: 'select-object'
    },
    3: {
        step: 3,
        name: 'add_tool',
        field: 'photos',
        message: 'Если хотите добавить фото инструмента, прикрепите или сделайте фото 📸',
        type: 'photo'
    },
    4: {
        step: 4,
        name: 'add_tool',
        field: 'movingDate',
        message: 'Дата перемещения (в формате дд-мм-гг) 🔄',
        type: 'text'
    },
    5: {
        step: 5,
        name: 'add_tool',
        field: 'inventoryDate',
        message: 'Дата инвентаризации (в формате дд-мм-гг) 🗒️',
        type: 'text'
    },
    6: {
        step: 6,
        name: 'add_tool',
        field: 'purchaseDate',
        message: 'Дата покупки (в формате дд-мм-гг) 🛍',
        type: 'text'
    },
    7: {
        step: 7,
        name: 'add_tool',
        field: 'broken',
        message: 'Выберите состояние инструмента ☯️',
        type: 'select',
        buttons: [{text: 'Работает 🟢', value: false}, {text: 'Сломан 🔴', value: true}]
    },
}
