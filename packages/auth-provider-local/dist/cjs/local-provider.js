"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalProvider = void 0;
const auth_1 = require("@syster42/auth");
const core_1 = require("@syster42/core");
let LocalProvider = class LocalProvider extends auth_1.Provider {
    constructor() {
        super(...arguments);
        this.type = 'local';
    }
    // eslint-disable-next-line class-methods-use-this
    async authenticate(cb) {
        return cb();
    }
};
LocalProvider = __decorate([
    (0, core_1.Singleton)()
], LocalProvider);
exports.LocalProvider = LocalProvider;
auth_1.ProviderRegistry.register(LocalProvider);
exports.default = LocalProvider;
