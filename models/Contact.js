module.exports = (sequelize, type) => {
    return sequelize.define('contact', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
            len: [2,100],
            validate: {
                notEmpty: {
                    msg: 'Name is required'
                }
            },
        },
        phone: {
            type: type.STRING,
            allowNull: false,
            len: [2,20],
            validate: {
                notEmpty: {
                    msg: 'Phone is required'
                }
            },
        },
        thumbnailUrl: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Thumbnail URL is required'
                }
            },
        },
        imgUrl: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Image URL is required'
                }
            },
        },
    });
};