'use strict';

var mongoose = require('mongoose');
var moment = require('moment');

///////////////////////////////////////////////////////////

var roleSchema = new mongoose.Schema({
    // 角色id
    uid: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },

    // 玩家等级
    lv: {
        type: Number,
        default: 1
    },

    // 玩家昵称
    name: {
        type: String,
        default: 'Vitah'
    },

    // 金币
    gold: {
        type: Number,
        default: 0
    },

    // 钻石
    diamond: {
        type: Number,
        default: 0
    }
});

roleSchema.pre('save', function (next) {
    console.log('用户' + this.uid + '保存，时间：' + moment());
    next();
});

/**
 * 获取用户id
 * @return {[type]} [description]
 */
roleSchema.methods.getUid = function () {
    return this.uid;
};

/**
 * 获取用户等级
 * @return {[type]} [description]
 */
roleSchema.methods.getLv = function () {
    return this.lv;
};

/**
 * 获取用户名称
 * @return {[type]} [description]
 */
roleSchema.methods.getName = function () {
    return this.name;
};

/**
 * 设置用户名字
 * @param {[type]} new_name [新的名字]
 */
roleSchema.methods.setName = function (new_name) {
    this.name = new_name;
};

/**
 * 获取金币
 * @return {[type]} [description]
 */
roleSchema.methods.getGold = function () {
    return this.gold;
};

/**
 * [addGold 添加金币]
 * @param {[type]} add_gold [添加的金币数目]
 */
roleSchema.methods.addGold = function (add_gold) {
    add_gold = parseInt(add_gold);
    if (add_gold >= 0) {
        this.gold += add_gold;
        return true;
    }

    return false;
};

/**
 * [subGold 扣除金币]
 * @param  {[type]} sub_gold [扣除的金币数目]
 * @return {[type]}          [description]
 */
roleSchema.methods.subGold = function (sub_gold) {
    sub_gold = parseInt(sub_gold);
    if (this.gold < sub_gold) {
        return false;
    }
    this.gold -= sub_gold;
    return true;
};

/**
 * 获取用户钻石
 * @return {[type]} [description]
 */
roleSchema.methods.getDiamond = function () {
    return this.diamond;
};

/**
 * [addDiamond 添加钻石]
 * @param {[type]} add_diamond [添加的钻石数量]
 */
roleSchema.methods.addDiamond = function (add_diamond) {
    add_diamond = parseInt(add_diamond);
    if (add_diamond >= 0) {
        this.diamond += add_diamond;
        return true;
    }
    return false;
};

/**
 * [subDiamond 扣除钻石]
 * @param  {[type]} sub_diamond [扣除的钻石数目]
 * @return {[type]}             [description]
 */
roleSchema.methods.subDiamond = function (sub_diamond) {
    sub_diamond = parseInt(sub_diamond);
    if (this.diamond < sub_diamond) {
        return false;
    }
    this.diamond -= sub_diamond;
    return true;
};

// 生成json格式内容的函数
if (!roleSchema.options.toJSON) {
    roleSchema.options.toJSON = {};
}
/* jshint unused:false */
roleSchema.options.toJSON.transform = function (doc, ret) {
    delete ret._id;
    delete ret.__v;
};

// 生成Role模型
mongoose.model('Role', roleSchema);