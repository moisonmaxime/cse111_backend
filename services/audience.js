let db = require('../db_manager')


async function getAudience(req, res) {
    try {
        let aud = await db.all(
            'SELECT u_username ' +
            'FROM audience, tag_audience, food_tag, drink_tag, food, drink, container, user_container, user' +
            'where a_id =ta_audience_id' +
            'and t_id =ta_tag_id' +
            'and dt_drink_id= d_id' +
            'and dt_tag_id= t_id' +
            'and ft_drink_id= f_id' +
            'and ft_tag_id= t_id' +
            'and f_container_id= c_id' +
            'and d_container_id =c_id' +
            'and uc_c_id =c_id' +
            'and uc_u_id =u_id' +
            'and t_name =$tname'
            ,{ $tname: req.params.tname }
            );
        res.send(aud);
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
};
exports.getAudience = getAudience;
