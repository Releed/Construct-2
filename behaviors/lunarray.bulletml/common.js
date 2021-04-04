//This is a modified version of a source file from the 
//bulletml.js of shinichiro.h libBulletML library.
//original file can be found at http://shinh.skr.jp/jsdmkun/jsdmkun.html
//
//Modified BSD License for libBulletML
//Copyright (c) 2003, shinichiro.h All rights reserved.
//
//Redistribution and use in source and binary forms, with or without
//modification, are permitted provided that the following conditions are
//met:
//
//    * Redistributions of source code must retain the above copyright
//      notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
//      copyright notice, this list of conditions and the following
//      disclaimer in the documentation and/or other materials provided
//      with the distribution.
//    * The name of the author may not be used to endorse or promote
//      products derived from this software without specific prior
//      written permission.
//
//THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
//A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
//OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
//THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
//OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

function Obj() {
  this.alive = true;
  this.cleanup = true;
}

Obj.prototype.move = function() {
};

Obj.prototype.draw = function() {
};

Obj.prototype.ensureBounded = function() {
    var o = this.behaviour_inst;
    if (this.x < o.MLsideMargin + o.MLoffsetX) this.x = o.MLsideMargin + o.MLoffsetX;
    else if (this.x > o.MLwidth - o.MLsideMargin + o.MLoffsetX) this.x = o.MLwidth - o.MLsideMargin + o.MLoffsetX;
    if (this.y < o.topMargin + o.MLoffsetY) this.y = o.topMargin + o.MLoffsetY;
    else if (this.y > o.MLheight - o.MLtopMargin + o.MLoffsetY) this.y = o.MLheight - o.MLtopMargin + o.MLoffsetY;
};

Obj.prototype.checkBounded = function() {
    if (this.instance) {
      var o = this.behaviour_inst;
      if (this.instance.x < (-o.MLsideMargin + o.MLoffsetX) || this.instance.x > (o.MLwidth+o.MLsideMargin+o.MLoffsetX) || this.instance.y < -o.MLtopMargin  + o.MLoffsetY || this.instance.y > o.MLheight+o.MLtopMargin+ o.MLoffsetY) 
        this.alive = false;
    }
};

function Shot(instance, x, y, d, v, bhv) {
    this.instance = instance;
    this.x = x;
    this.y = y;
    this.d = d;
    this.v = v;
    this.behaviour_inst = bhv;
    this.isBoss = false;
}

Shot.prototype = new Obj();

Shot.prototype.move = function() {
    var r = Math.PI * this.d / 180;
    this.x += Math.sin(r) * this.v;
    this.y += -Math.cos(r) * this.v;
    this.checkBounded();
};

function Player(instance, x, y) {
    this.x = x;
    this.y = y;
    this.instance = instance;
}

Player.prototype = new Obj();

Player.prototype.move = function() {
  this.x = this.instance.x;
  this.y = this.instance.y;
}

function Enemy(instance, runner, target, x, y, d, v, isBoss, beh_inst, tag, rank, layer, imgpt) {
  this.runtime = instance.runtime;
  this.layer = layer;
  this.imgpt = imgpt;
  this.instance = instance;
  runner.obj = this;
  this.runner = runner;
  this.x = x;
  this.y = y;
  this.d = d;
  this.v = v;
  this.r = 0;
  this.isBoss = isBoss;
  this.tag = tag;
  this.behaviour_inst = beh_inst;
  this.rank = rank;
  this.target = target;
  this.paused = false;
  this.end = false;
};

Enemy.prototype = new Obj();

Enemy.prototype.move = function() {
    if (this.alive && !this.paused) {
        this.runner.run();

        var r = Math.PI * this.d / 180;
        this.r = r;
        this.x += Math.sin(r) * this.v;
        this.y += -Math.cos(r) * this.v;

        if (this.isBoss) {
            this.ensureBounded();
        }
        else {
            this.checkBounded();
        }
    }
};

Enemy.prototype.doVanish = function() {
  this.alive = false;
};

Enemy.prototype.getRank = function() {
    var rank = this.rank;
    if (rank > 100) rank = 100;
    else if (rank < 0) rank = 0;
    return rank / 100;
};

Enemy.prototype.getTurn = function() {
    return this.behaviour_inst.MLtimer;
};

Enemy.prototype.getDefaultSpeed = function() {
    return 1;
};

Enemy.prototype.getAimDirection = function() {
    var dx = this.target.x - this.x;
    var dy = this.target.y - this.y;
    return Math.atan2(dx, -dy) * 180 / Math.PI;
};

Enemy.prototype.getBulletDirection = function() {
    return this.d;
};

Enemy.prototype.getBulletSpeed = function() {
    return this.v;
};

Enemy.prototype.getBulletSpeedX = function() {
    var r = Math.PI * this.d / 180;
    return Math.sin(r) * this.v;
};

Enemy.prototype.getBulletSpeedY = function() {
    var r = Math.PI * this.d / 180;
    return -Math.cos(r) * this.v;
};

Enemy.prototype.createSimpleBullet = function(d, v) {
		var inst = this.runtime.createInstance(this.behaviour_inst.MLBulletSprite["default"], this.layer, this.instance.getImagePoint(this.imgpt, true), this.instance.getImagePoint(this.imgpt, false));
    if (inst.recycled) {
      inst.x = this.x;
      inst.y = this.y;
      inst.visible = true;
    }
    var shot = new Shot(inst, this.x, this.y, d, v, this.behaviour_inst);
    inst.shot = shot;
 		inst.itemDestroyCallback = (function (self) {
    											return function(inst) {
                            if (inst.shot !== undefined) inst.shot.paused = true;
                            if (inst.shot !== undefined) inst.shot.cleanup = false;
                            if (inst.shot !== undefined) inst.shot.alive = false;
    											};
    										})(this);
 		this.runtime.addDestroyCallback(inst.itemDestroyCallback);

    this.behaviour_inst.MLObjs.push(shot);
};

Enemy.prototype.createBullet = function(state, d, v, bulletLabel) {
    var runner = new BulletMLRunner(state.bulletml, state);
    if (this.behaviour_inst.MLBulletSprite[bulletLabel] === undefined) {
  		var inst = this.runtime.createInstance(this.behaviour_inst.MLBulletSprite["default"], this.layer, this.instance.getImagePoint(this.imgpt, true), this.instance.getImagePoint(this.imgpt, false));
    } else {
  		var inst = this.runtime.createInstance(this.behaviour_inst.MLBulletSprite[bulletLabel], this.layer, this.instance.getImagePoint(this.imgpt, true), this.instance.getImagePoint(this.imgpt, false));
    } 
    var shot = new Enemy(inst, runner, this.target, inst.x, inst.y, d, v, false, this.behaviour_inst, "", this.rank, this.layer, this.imgpt);
    inst.shot = shot;
 		inst.itemDestroyCallback = (function (self) {
    											return function(inst) {
                            if (inst.shot !== undefined) inst.shot.paused = true;
                            if (inst.shot !== undefined) inst.shot.cleanup = false;
                            if (inst.shot !== undefined) inst.shot.alive = false;
    											};
    										})(this);
 		this.runtime.addDestroyCallback(inst.itemDestroyCallback);

    this.behaviour_inst.MLObjs.push(shot);
};

Enemy.prototype.doChangeDirection = function(d) {
    this.d = d;
};

Enemy.prototype.doChangeSpeed = function(v) {
    this.v = v;
};

Enemy.prototype.doAccelX = function(vx) {
    var vy = this.getBulletSpeedY();
    this.v = Math.sqrt(vx * vx + vy * vy);
    this.d = Math.atan2(vx, -vy) * 180 / Math.PI;
};

Enemy.prototype.doAccelY = function(vy) {
    var vx = this.getBulletSpeedX();
    this.v = Math.sqrt(vx * vx + vy * vy);
    this.d = Math.atan2(vx, -vy) * 180 / Math.PI;
};

function getChild(n, t) {
    for (var i = 0; i < n.childNodes.length; i++) {
        var c = n.childNodes[i];
        if (c.tagName == t) {
            return c;
        }
    }
    return null;
}

function BulletMLError(msg) {
    this.name = 'BulletMLError';
    this.message = msg;
    this.description = this.name + ': message ' + this.message;
}
BulletMLError.prototype = new Error;

function BulletMLState(bulletml, nodes, params) {
    this.bulletml = bulletml;
    this.nodes = nodes;
    this.params = params;
}
function BulletMLRunnerImpl(state, runner) {
    this.state = state;
    this.isEnd = false;
    this.actIndex = 0;
    this.act = this.state.nodes[0];
    this.actTurn = -1;
    this.runner = runner;
    this.repeatStack = [];
    this.refStack = [];
    this.bulletDir = null;
    this.bulletSpd = null;
    this.prevDir = 0;
    this.prevSpd = 0;

    this.dirChangeVal = 0;
    this.dirChangeCnt = 0;
    this.spdChangeVal = 0;
    this.spdChangeCnt = 0;
    this.accelXVal = 0;
    this.accelXCnt = 0;
    this.accelYVal = 0;
    this.accelYCnt = 0;
}

BulletMLRunnerImpl.prototype.getNumberContent = function(n) {
    var e = n.textContent;
    e = e.replace(/\$rank/g, this.runner.obj.getRank());
    for (var i = 0; i < this.state.params.length; i++) {
        var reg = new RegExp('\\$' + (i + 1), 'g');
        var p = '(' + this.state.params[i] + ')';
        e = e.replace(reg, p);
    }
    while (e.match(/\$rand/)) {
        e = e.replace(/\$rand/, Math.random());
    }
    if (e.match(/[^-()+*\/0-9\. \n\t]/)) {
        throw new BulletMLError('Invalid expr: ' + n.textContent +
                                ' (=> ' + e + ')');
    }
    return eval(e);
}

BulletMLRunnerImpl.prototype.isTurnEnd = function() {
    return this.isEnd || this.actTurn > this.endTurn;
};

BulletMLRunnerImpl.prototype.getDirection = function(n, type) {
    var d = this.getNumberContent(n);
    if (!type) type = n.getAttribute('type');
    if (!type || type == 'aim') {
        d += this.runner.obj.getAimDirection();
    }
    else if (type == 'absolute') {
        if (this.runner.isHorizontal) {
            d -= 90;
        }
    }
    else if (type == 'sequence') {
        d += this.prevDir;
    }
    else if (type == 'relative') {
        d += this.runner.obj.getBulletDirection();
    }
    return d;
};

BulletMLRunnerImpl.prototype.setDirection = function(n) {
    var n = getChild(n, 'direction');
    if (n) {
        this.bulletDir = this.getDirection(n);
    }
};

BulletMLRunnerImpl.prototype.getSpeed = function(n, type) {
    var v = this.getNumberContent(n);
    if (!type) type = n.getAttribute('type');
    if (!type || type == 'absolute') {
    }
    else if (type == 'sequence') {
        v += this.prevSpd;
    }
    else if (type == 'relative') {
        v += this.runner.obj.getBulletSpeed();
    }
    return v;
};

BulletMLRunnerImpl.prototype.setSpeed = function(n) {
    var n = getChild(n, 'speed');
    if (n) {
        this.bulletSpd = this.getSpeed(n);
    }
};

BulletMLRunnerImpl.prototype.getNextNode = function(n) {
    if (n.parentNode.tagName == 'bulletml' ||
        n == this.state.nodes[this.actIndex]) {
        var top = this.refStack[this.refStack.length - 1];
        if (top) {
            n = top[0];
            this.state.params = top[1];
            this.refStack.pop();
        }
        else {
            ++this.actIndex;
            if (n == this.state.nodes[this.actIndex]) {
                return this.state.nodes[this.actIndex];
            }
            else {
                this.isEnd = true;
                return null;
            }
        }
    }
    var nn = n.nextSibling;
    if (!nn) {
        n = n.parentNode;
        if (n.tagName == 'repeat') {
            var top = this.repeatStack[this.repeatStack.length - 1];
            if (top) {
                top[0]--;
                if (top[0] > 0) {
                    nn = top[1];
                    return nn;
                }
                else {
                    this.repeatStack.pop();
                }
            }
            else {
                throw new BulletMLRunnerImpl(
                    'internal error: repeatStack is empty');
            }
        }
        nn = this.getNextNode(n);
    }
    return nn;
};

BulletMLRunnerImpl.prototype.calcAccel = function(xy, n, term) {
    var val = this.getNumberContent(n);

    var type = n.getAttribute('type');
    if (type == 'sequence') {
    }
    else if (type == 'relative') {
        val += this.runner.obj['getBulletSpeed' + xy]();
        val /= term;
    }
    else {
        val /= term;
    }

    this['accel' + xy + 'Val'] = val;
    this['accel' + xy + 'Cnt'] = term;
};

BulletMLRunnerImpl.prototype.run = function() {
    if (this.dirChangeCnt > 0) {
        this.dirChangeCnt--;
        var d = this.runner.obj.getBulletDirection() + this.dirChangeVal;
        this.runner.obj.doChangeDirection(d);
    }
    if (this.spdChangeCnt > 0) {
        this.spdChangeCnt--;
        var v = this.runner.obj.getBulletSpeed() + this.spdChangeVal;
        this.runner.obj.doChangeSpeed(v);
    }
    if (this.accelXCnt > 0) {
        this.accelXCnt--;
        var v = this.runner.obj.getBulletSpeedX() + this.accelXVal;
        this.runner.obj.doAccelX(v);
    }
    if (this.accelYCnt > 0) {
        this.accelYCnt--;
        var v = this.runner.obj.getBulletSpeedY() + this.accelYVal;
        this.runner.obj.doAccelY(v);
    }

    if (this.isEnd && this.runner.obj.isBoss) this.runner.obj.end = true;

    if (this.isEnd) return;

    this.endTurn = this.runner.obj.getTurn();

    if (this.actTurn == -1) {
        this.actTurn = this.runner.obj.getTurn();
    }

    var cnt = 0;
    
    while (this.act && !this.isTurnEnd()) {
        var n = this.act;
        var t = n.tagName;
        //if (t) console.log('cmd@: ' + t);
        if (!t || t == 'speed' || t == 'direction') {
            this.act = n.nextSibling;
        }
        else if (t == 'action') {
            this.act = n.firstChild;
        }
        else if (t == 'fire') {
            this.bulletSpd = null;
            this.bulletDir = null;
            this.setDirection(n);
            this.setSpeed(n);
            this.act = n.firstChild;
        }
        else if (t == 'bullet') {
            this.setDirection(n);
            this.setSpeed(n);

            if (this.bulletSpd === null) {
                this.bulletSpd = this.runner.obj.getDefaultSpeed();
            }
            if (this.bulletDir === null) {
                this.bulletDir = this.runner.obj.getAimDirection();
            }

            var acts = [];
            var children = n.childNodes;
            for (var i = 0; i < children.length; i++) {
                var c = children[i];
                var t = c.tagName;
                if (t == 'action' || t == 'actionRef') {
                    acts.push(c);
                }
            }

            this.prevDir = this.bulletDir;
            this.prevSpd = this.bulletSpd;

            if (acts.length > 0) {
                var state = new BulletMLState(this.runner.bulletml,
                                              acts,
                                              this.state.params);
                                              
                if (n.attributes.getNamedItem("label") != null) {
                  var bulletLabel = n.attributes.getNamedItem("label").value;
                } else {
                  var bulletLabel = "default";
                }
                
                this.runner.obj.createBullet(state,
                                             this.bulletDir, this.bulletSpd, bulletLabel);
            }
            else {
                this.runner.obj.createSimpleBullet(this.bulletDir,
                                                   this.bulletSpd);
            }
            this.act = null;
        }
        else if (t.match(/^([a-z]+)Ref$/)) {
            var type = RegExp.$1;
            var map = this.state.bulletml[type];
            if (!map) {
                throw new BulletMLError('Undefined ref tag: ' + t);
            }

            this.refStack.push([n, this.state.params]);

            var params = [];
            var children = n.childNodes;
            for (var i = 0; i < children.length; i++) {
                var c = children[i];
                if (c.tagName == 'param') {
                    params.push(this.getNumberContent(c));
                }
            }
            this.state.params = params;

            var label = n.getAttribute('label');
            n = map[label];
            if (!n) {
                throw new BulletMLError(
                    'Undefined ' + type + ' label: ' + label);
            }
            this.act = n;
        }
        else if (t == 'wait') {
            this.actTurn += this.getNumberContent(n);
            this.act = null;
        }
        else if (t == 'changeSpeed') {
            var termNode = getChild(n, 'term');
            if (!termNode) {
                throw new BulletMLError('changeSpeed must have term');
            }
            var term = this.getNumberContent(termNode);
            if (term < 1) term = 1;

            var spdNode = getChild(n, 'speed');
            if (!spdNode) {
                throw new BulletMLError('changeSpeed must have speed');
            }
            var type = spdNode.getAttribute('type');

            var spd;
            if (type == 'sequence') {
                spd = this.getNumberContent(spdNode);
            }
            else {
                var speed = this.getSpeed(spdNode, type);
                var spdFirst = this.runner.obj.getBulletSpeed();
                spd = (speed - spdFirst) / term;
            }

            this.spdChangeCnt = term;
            this.spdChangeVal = spd;

            this.act = null;
        }
        else if (t == 'changeDirection') {
            var termNode = getChild(n, 'term');
            if (!termNode) {
                throw new BulletMLError('changeDirection must have term');
            }
            var term = this.getNumberContent(termNode);
            if (term < 1) term = 1;

            var dirNode = getChild(n, 'direction');
            if (!dirNode) {
                throw new BulletMLError('changeDirection must have direction');
            }
            var type = dirNode.getAttribute('type');

            var dir;
            if (type == 'sequence') {
                dir = this.getNumberContent(dirNode);
            }
            else {
                var direction = this.getDirection(dirNode, type);
                var dirFirst = this.runner.obj.getBulletDirection();

                // I didn't see this logic...
                var dirSpace;
                var dirSpace1 = direction - dirFirst;
                var dirSpace2;
                if (dirSpace1 > 0) dirSpace2 = dirSpace1 - 360;
                else dirSpace2 = dirSpace1 + 360;
                if (Math.abs(dirSpace1) < Math.abs(dirSpace2)) {
                    dirSpace = dirSpace1;
                }
                else {
                    dirSpace = dirSpace2;
                }

                dir = dirSpace / term;
            }

            this.dirChangeCnt = term;
            this.dirChangeVal = dir;

            this.act = null;
        }
        else if (t == 'accel') {
            var termNode = getChild(n, 'term');
            if (!termNode) {
                throw new BulletMLError('accel must have term');
            }
            var term = this.getNumberContent(termNode);
            if (term < 1) term = 1;

            var hNode = getChild(n, 'horizontal');
            var vNode = getChild(n, 'vertical');

            if (this.runner.isHorizontal) {
                if (vNode) this.calcAccel('X', vNode, term);
                if (hNode) this.calcAccel('Y', hNode, term);
            }
            else {
                if (hNode) this.calcAccel('X', hNode, term);
                if (vNode) this.calcAccel('Y', vNode, term);
            }

            this.act = null;
        }
        else if (t == 'repeat') {
            var times = getChild(n, 'times');
            if (!times) {
                throw new BulletMLError('repeat must have times');
            }
            var t = this.getNumberContent(times);

            var actionNode = getChild(n, 'action');
            if (!actionNode) {
                actionNode = getChild(n, 'actionRef');
                if (!actionNode) {
                    throw new BulletMLError(
                        'repeat must have action or actionRef');
                }
            }

            this.repeatStack.push([t, actionNode]);
            this.act = actionNode;
        }
        else if (t == 'vanish') {
            this.act = null;
            this.isEnd = true;
            this.runner.obj.doVanish();
            break;
        }

        if (!this.act) {
            this.act = this.getNextNode(n);
        }

        cnt++;
        if (cnt > 10000) {
            throw new BulletMLError(
                '10000 commands were executed in this frame');
        }
    }
};

function BulletMLRunner(bulletml, state) {
    this.bulletml = bulletml;
    this.isHorizontal = (bulletml.getAttribute('type') == 'horizontal');

    if (state) {
        this.impls = [new BulletMLRunnerImpl(state, this)];
    } else {
        var types = ['action', 'fire', 'bullet'];
        for (var j = 0; j < 3; j++) {
            var t = types[j];
            bulletml[t] = {};
            var nodes = bulletml.getElementsByTagName(t);
            for (var i = 0; i < nodes.length; i++) {
                var n = nodes[i];
                var label = n.getAttribute('label');
                if (label) {
                    bulletml[t][label] = n;
                }
            }
        }

        this.impls = new Array();
        
        for (var label in bulletml.action) {
            if (label.match(/^top/)) {
                var state = new BulletMLState(bulletml,
                                              [bulletml.action[label]],
                                              []);
                this.impls.push(new BulletMLRunnerImpl(state, this));
            }
        }
    }
}

BulletMLRunner.prototype.run = function() {
    for (var i = 0; i < this.impls.length; i++) {
        this.impls[i].run();
    }
};
