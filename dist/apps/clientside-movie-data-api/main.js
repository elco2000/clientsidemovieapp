/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(6);
const features_1 = __webpack_require__(7);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [features_1.BackendFeaturesMovieModule, features_1.BackendFeaturesActorModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(6);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(8), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackendFeaturesMovieModule = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(9);
const common_1 = __webpack_require__(1);
const movie_controller_1 = __webpack_require__(10);
const movie_service_1 = __webpack_require__(11);
const movie_schema_1 = __webpack_require__(12);
let BackendFeaturesMovieModule = class BackendFeaturesMovieModule {
};
exports.BackendFeaturesMovieModule = BackendFeaturesMovieModule;
exports.BackendFeaturesMovieModule = BackendFeaturesMovieModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [movie_controller_1.MovieController],
        providers: [movie_service_1.MovieService],
        imports: [mongoose_1.MongooseModule.forRoot('mongodb+srv://elcoAdmin:Admin123Database@clusterlocaldataapi.m0cwagc.mongodb.net/'), mongoose_1.MongooseModule.forFeature([{ name: movie_schema_1.Movie.name, schema: movie_schema_1.MovieSchema }])],
        exports: [movie_service_1.MovieService],
    })
], BackendFeaturesMovieModule);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovieController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const common_2 = __webpack_require__(1);
const movie_service_1 = __webpack_require__(11);
const dto_1 = __webpack_require__(14);
const movie_schema_1 = __webpack_require__(12);
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async getAll() {
        return this.movieService.getAll();
    }
    async getSmallInformationByActorId(id) {
        return this.movieService.getSmallInformationByActorId(id);
    }
    async getOne(id) {
        return this.movieService.getOne(id);
    }
    async create(data) {
        return this.movieService.create(data);
    }
    async update(data) {
        return this.movieService.edit(data);
    }
    async delete(id) {
        return this.movieService.delete(id);
    }
};
exports.MovieController = MovieController;
tslib_1.__decorate([
    (0, common_2.Get)(''),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], MovieController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_2.Get)('actor/:id'),
    tslib_1.__param(0, (0, common_2.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MovieController.prototype, "getSmallInformationByActorId", null);
tslib_1.__decorate([
    (0, common_2.Get)(':id'),
    tslib_1.__param(0, (0, common_2.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], MovieController.prototype, "getOne", null);
tslib_1.__decorate([
    (0, common_2.Post)(''),
    tslib_1.__param(0, (0, common_2.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.CreateMovieDto !== "undefined" && dto_1.CreateMovieDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], MovieController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_2.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof movie_schema_1.Movie !== "undefined" && movie_schema_1.Movie) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], MovieController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_2.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], MovieController.prototype, "delete", null);
exports.MovieController = MovieController = tslib_1.__decorate([
    (0, common_1.Controller)('movie'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof movie_service_1.MovieService !== "undefined" && movie_service_1.MovieService) === "function" ? _a : Object])
], MovieController);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovieService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const movie_schema_1 = __webpack_require__(12);
const mongoose_1 = tslib_1.__importStar(__webpack_require__(13));
const mongoose_2 = __webpack_require__(9);
let MovieService = class MovieService {
    constructor(movieModel) {
        this.movieModel = movieModel;
        this.TAG = 'MovieService';
    }
    async getAll() {
        common_1.Logger.log('getAll', this.TAG);
        return this.movieModel.find().exec();
    }
    async getSmallInformationByActorId(id) {
        common_1.Logger.log(`getSmallInformationByActorId(${id})`, this.TAG);
        return this.movieModel.find({ actors: id }).select({ title: 1, photo: 1 }).exec();
    }
    async getOne(id) {
        common_1.Logger.log(`getOne(${id})`, this.TAG);
        try {
            const movie = await this.movieModel
                .findById(id)
                .populate('actors')
                .exec();
            if (!movie) {
                throw new common_1.NotFoundException(`Movie not found for ID: ${id}`);
            }
            return movie;
        }
        catch (error) {
            common_1.Logger.error(`Error fetching movie: ${error}`);
            throw new Error(`Error fetching movie: ${error}`);
        }
    }
    async create(movie) {
        common_1.Logger.log('create', this.TAG);
        const newMovie = new this.movieModel(movie);
        newMovie._id = new mongoose_1.default.Types.ObjectId().toString();
        return newMovie.save();
    }
    async edit(movie) {
        common_1.Logger.log('edit', this.TAG);
        const editedMovie = { ...movie };
        try {
            const updatedMovie = await this.movieModel
                .findByIdAndUpdate(editedMovie._id, editedMovie, { new: true })
                .exec();
            return updatedMovie ?? null;
        }
        catch (error) {
            common_1.Logger.error(`Error editing movie: ${error}`);
            throw new Error(`Error editing movie: ${error}`);
        }
    }
    async delete(id) {
        common_1.Logger.log('delete', this.TAG);
        const movie = await this.movieModel.findByIdAndDelete(id).exec();
        if (!movie) {
            throw new common_1.NotFoundException(`Movie not found for ID: ${id}`);
        }
        return movie;
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(movie_schema_1.Movie.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], MovieService);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovieSchema = exports.Movie = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(9);
const mongoose_2 = tslib_1.__importDefault(__webpack_require__(13));
let Movie = class Movie {
};
exports.Movie = Movie;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId }),
    tslib_1.__metadata("design:type", String)
], Movie.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Movie.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Movie.prototype, "photo", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Movie.prototype, "length", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Movie.prototype, "releaseDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Movie.prototype, "advicedAge", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Movie.prototype, "genre", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Movie.prototype, "language", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Movie.prototype, "director", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Actor' }] }),
    tslib_1.__metadata("design:type", Array)
], Movie.prototype, "actors", void 0);
exports.Movie = Movie = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Movie);
exports.MovieSchema = mongoose_1.SchemaFactory.createForClass(Movie);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(15), exports);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DtoModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let DtoModule = class DtoModule {
};
exports.DtoModule = DtoModule;
exports.DtoModule = DtoModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], DtoModule);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMovieDto = exports.CreateMovieDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(17);
class CreateMovieDto {
    constructor(data) { Object.assign(this, data); }
}
exports.CreateMovieDto = CreateMovieDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateMovieDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateMovieDto.prototype, "photo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateMovieDto.prototype, "length", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateMovieDto.prototype, "releaseDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateMovieDto.prototype, "advicedAge", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateMovieDto.prototype, "genre", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateMovieDto.prototype, "language", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateMovieDto.prototype, "director", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], CreateMovieDto.prototype, "actors", void 0);
class UpdateMovieDto {
}
exports.UpdateMovieDto = UpdateMovieDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateMovieDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateMovieDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateMovieDto.prototype, "photo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateMovieDto.prototype, "length", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UpdateMovieDto.prototype, "releaseDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateMovieDto.prototype, "advicedAge", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateMovieDto.prototype, "genre", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateMovieDto.prototype, "language", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateMovieDto.prototype, "director", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], UpdateMovieDto.prototype, "actors", void 0);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateActorDto = exports.CreateActorDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(17);
class CreateActorDto {
    constructor(data) { Object.assign(this, data); }
}
exports.CreateActorDto = CreateActorDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateActorDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateActorDto.prototype, "birthdate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateActorDto.prototype, "nationality", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateActorDto.prototype, "photo", void 0);
class UpdateActorDto {
    constructor(data) { Object.assign(this, data); }
}
exports.UpdateActorDto = UpdateActorDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateActorDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateActorDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UpdateActorDto.prototype, "birthdate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateActorDto.prototype, "nationality", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateActorDto.prototype, "photo", void 0);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiResponseInterceptor = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const operators_1 = __webpack_require__(20);
let ApiResponseInterceptor = class ApiResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((results) => {
            if (results) {
                return {
                    results,
                    info: {
                        version: '1.0',
                        type: results instanceof Array ? 'list' : 'object',
                        count: results instanceof Array ? results.length : 1,
                    },
                };
            }
            else {
                return {
                    results: undefined,
                    info: {
                        version: '1.0',
                        type: 'none',
                        count: 0,
                    },
                };
            }
        }));
    }
};
exports.ApiResponseInterceptor = ApiResponseInterceptor;
exports.ApiResponseInterceptor = ApiResponseInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ApiResponseInterceptor);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackendFeaturesActorModule = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(9);
const actor_controller_1 = __webpack_require__(22);
const actor_schema_1 = __webpack_require__(24);
const actor_service_1 = __webpack_require__(23);
const common_1 = __webpack_require__(1);
let BackendFeaturesActorModule = class BackendFeaturesActorModule {
};
exports.BackendFeaturesActorModule = BackendFeaturesActorModule;
exports.BackendFeaturesActorModule = BackendFeaturesActorModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [actor_controller_1.ActorController],
        providers: [actor_service_1.ActorService],
        imports: [mongoose_1.MongooseModule.forRoot('mongodb+srv://elcoAdmin:Admin123Database@clusterlocaldataapi.m0cwagc.mongodb.net/'), mongoose_1.MongooseModule.forFeature([{ name: actor_schema_1.Actor.name, schema: actor_schema_1.ActorSchema }])],
        exports: [actor_service_1.ActorService]
    })
], BackendFeaturesActorModule);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorController = void 0;
const tslib_1 = __webpack_require__(4);
const dto_1 = __webpack_require__(14);
const actor_service_1 = __webpack_require__(23);
const common_1 = __webpack_require__(1);
const actor_schema_1 = __webpack_require__(24);
let ActorController = class ActorController {
    constructor(actorService) {
        this.actorService = actorService;
    }
    async getAll() {
        return this.actorService.getAll();
    }
    async getAllForLookup() {
        return this.actorService.GetAllForLookup();
    }
    async getOne(id) {
        return this.actorService.getOne(id);
    }
    async create(data) {
        return this.actorService.create(data);
    }
    async update(data) {
        return this.actorService.edit(data);
    }
    async delete(id) {
        return this.actorService.delete(id);
    }
};
exports.ActorController = ActorController;
tslib_1.__decorate([
    (0, common_1.Get)(''),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ActorController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('lookup'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ActorController.prototype, "getAllForLookup", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ActorController.prototype, "getOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(''),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.CreateActorDto !== "undefined" && dto_1.CreateActorDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ActorController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof actor_schema_1.Actor !== "undefined" && actor_schema_1.Actor) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ActorController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ActorController.prototype, "delete", null);
exports.ActorController = ActorController = tslib_1.__decorate([
    (0, common_1.Controller)('actor'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof actor_service_1.ActorService !== "undefined" && actor_service_1.ActorService) === "function" ? _a : Object])
], ActorController);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(9);
const actor_schema_1 = __webpack_require__(24);
const mongoose_2 = tslib_1.__importStar(__webpack_require__(13));
let ActorService = class ActorService {
    constructor(actorModel) {
        this.actorModel = actorModel;
        this.TAG = 'ActorService';
    }
    async getAll() {
        common_1.Logger.log('getAll', this.TAG);
        return this.actorModel.find().exec();
    }
    async GetAllForLookup() {
        common_1.Logger.log('getAllForLookup', this.TAG);
        return this.actorModel.find().select({ name: 1 }).exec();
    }
    async getOne(id) {
        common_1.Logger.log(`getOne(${id})`, this.TAG);
        try {
            const actor = await this.actorModel.findById(id).exec();
            if (!actor) {
                throw new common_1.NotFoundException(`Actor not found for ID: ${id}`);
            }
            return actor;
        }
        catch (error) {
            common_1.Logger.error(`Error fetching actor: ${error}`);
            throw new Error(`Error fetching actor: ${error}`);
        }
    }
    async create(actor) {
        common_1.Logger.log('create', this.TAG);
        const newActor = new this.actorModel(actor);
        newActor._id = new mongoose_2.default.Types.ObjectId().toString();
        return newActor.save();
    }
    async edit(actor) {
        common_1.Logger.log('edit', this.TAG);
        const editedActor = { ...actor };
        try {
            const updatedActor = await this.actorModel.findByIdAndUpdate(editedActor._id, editedActor, { new: true }).exec();
            return updatedActor ?? null;
        }
        catch (error) {
            common_1.Logger.error(`Error editing actor: ${error}`);
            throw new Error(`Error editing actor: ${error}`);
        }
    }
    async delete(id) {
        common_1.Logger.log('delete', this.TAG);
        const actor = await this.actorModel.findByIdAndDelete(id).exec();
        if (!actor) {
            throw new common_1.NotFoundException(`Actor not found for ID: ${id}`);
        }
        return actor;
    }
};
exports.ActorService = ActorService;
exports.ActorService = ActorService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(actor_schema_1.Actor.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ActorService);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorSchema = exports.Actor = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(9);
const mongoose_2 = tslib_1.__importDefault(__webpack_require__(13));
let Actor = class Actor {
};
exports.Actor = Actor;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId }),
    tslib_1.__metadata("design:type", String)
], Actor.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Actor.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Actor.prototype, "birthdate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Actor.prototype, "nationality", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Actor.prototype, "photo", void 0);
exports.Actor = Actor = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Actor);
exports.ActorSchema = mongoose_1.SchemaFactory.createForClass(Actor);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const dto_1 = __webpack_require__(14);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const corsOptions = {
        origin: '*'
    };
    app.enableCors(corsOptions);
    app.useGlobalInterceptors(new dto_1.ApiResponseInterceptor());
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map