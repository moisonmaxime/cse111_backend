let db = require('../db_manager')

async function getTag(req, res) {
    try {
        let tag = await db.all('SELECT t_name ' +
            'FROM tag' );
        res.send(tag);
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
};
exports.getTag = getTag;

async function getTagContents(req, res) {
    try {
        let tag = await db.all('SELECT f_name, d_name ' +
            'FROM tag, food_tag, drink_tag, food, drink ' +
            'Where t_name =$tname ' +
            'and ft_food_id = f_id ' +
            'and dt_drink_id = d_id ' +
            'and dt_tag_id = t_id ' +
            'and ft_tag_id = t_id '
            ,{ $tname: req.body.tname });
        res.send(tag);
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
};
exports.getTagContents = getTagContents;

async function createTag(req, res) {
    try {
         await db.run('INSERT INTO ' +
            'tag (t_name) ' +
            'VALUES ($tname) '
            ,{ $tname: req.body.tname });

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
};
exports.createTag = createTag;