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
const auth_1 = __webpack_require__(34);
const nest_neo4j_1 = __webpack_require__(14);
const user_1 = __webpack_require__(37);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [features_1.BackendFeaturesMovieModule,
            features_1.BackendFeaturesActorModule,
            features_1.BackendFeaturesReviewModule,
            features_1.BackendFeaturesCollectionModule,
            auth_1.AuthModule,
            user_1.UserModule,
            nest_neo4j_1.Neo4jModule.forRoot({
                scheme: 'neo4j+s',
                host: '80f65338.databases.neo4j.io',
                port: 7687,
                username: 'neo4j',
                password: '5nJgIGtl_bhK4gG2wKZwVvIkvpAOqWfZF770r33nvAE',
            }),],
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
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(54), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);


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


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovieController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const common_2 = __webpack_require__(1);
const movie_service_1 = __webpack_require__(11);
const dto_1 = __webpack_require__(15);
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
    async getMoviesByIds(data) {
        return this.movieService.getMoviesByIds(data);
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
    (0, common_2.Get)('collection'),
    tslib_1.__param(0, (0, common_2.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], MovieController.prototype, "getMoviesByIds", null);
tslib_1.__decorate([
    (0, common_2.Get)(':id'),
    tslib_1.__param(0, (0, common_2.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], MovieController.prototype, "getOne", null);
tslib_1.__decorate([
    (0, common_2.Post)(''),
    tslib_1.__param(0, (0, common_2.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof dto_1.CreateMovieDto !== "undefined" && dto_1.CreateMovieDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], MovieController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_2.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof movie_schema_1.Movie !== "undefined" && movie_schema_1.Movie) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], MovieController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_2.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], MovieController.prototype, "delete", null);
exports.MovieController = MovieController = tslib_1.__decorate([
    (0, common_1.Controller)('movie'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof movie_service_1.MovieService !== "undefined" && movie_service_1.MovieService) === "function" ? _a : Object])
], MovieController);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovieService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const movie_schema_1 = __webpack_require__(12);
const mongoose_1 = tslib_1.__importStar(__webpack_require__(13));
const mongoose_2 = __webpack_require__(9);
const nest_neo4j_1 = __webpack_require__(14);
let MovieService = class MovieService {
    constructor(movieModel, neo4jService) {
        this.movieModel = movieModel;
        this.neo4jService = neo4jService;
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
    async getMoviesByIds(ids) {
        common_1.Logger.log(`getMoviesByIds`, this.TAG);
        try {
            const movies = await this.movieModel.find({ _id: { $in: ids } }).exec();
            if (!movies || movies.length === 0) {
                throw new common_1.NotFoundException(`No movies found for the given IDs`);
            }
            return movies;
        }
        catch (error) {
            common_1.Logger.error(`Error fetching movies: ${error}`);
            throw new Error(`Error fetching movies: ${error}`);
        }
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
        try {
            const newMovie = new this.movieModel(movie);
            newMovie._id = new mongoose_1.default.Types.ObjectId().toString();
            // MongoDB
            const resultMongoDB = await newMovie.save();
            if (resultMongoDB) {
                common_1.Logger.log('Movie saved in MongoDB:', resultMongoDB);
            }
            else {
                common_1.Logger.error('Failed to save movie in MongoDB');
                throw new Error('Failed to save movie in MongoDB');
            }
            // Neo4j
            await this.neo4jService.write(`
        CREATE (m:Movie {
          id: $id
        }) 
        RETURN m
        `, { id: newMovie._id.toString() });
            return resultMongoDB;
        }
        catch (error) {
            common_1.Logger.error(`Error creating movie: ${error}`);
            throw new Error(`Error creating movie: ${error}`);
        }
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
        try {
            const movie = await this.movieModel.findByIdAndDelete(id).exec();
            if (!movie) {
                throw new common_1.NotFoundException(`Movie not found for ID: ${id}`);
            }
            // Neo4j
            await this.neo4jService.write(`
        MATCH (m:Movie {
          id: $id
        }) 
        DELETE m
        `, { id: id });
            return movie;
        }
        catch (error) {
            common_1.Logger.error(`Error delete movie: ${error}`);
            throw new Error(`Error delete movie: ${error}`);
        }
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(movie_schema_1.Movie.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof nest_neo4j_1.Neo4jService !== "undefined" && nest_neo4j_1.Neo4jService) === "function" ? _b : Object])
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
/***/ ((module) => {

module.exports = require("nest-neo4j");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 16 */
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
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMovieDto = exports.CreateMovieDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(18);
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
/* 18 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateActorDto = exports.CreateActorDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(18);
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
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = exports.CreateUserDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(18);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateUserDto.prototype, "birthdate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "description", void 0);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateReviewDto = exports.CreateReviewDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(18);
class CreateReviewDto {
}
exports.CreateReviewDto = CreateReviewDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateReviewDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateReviewDto.prototype, "text", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateReviewDto.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateReviewDto.prototype, "movieId", void 0);
class UpdateReviewDto {
}
exports.UpdateReviewDto = UpdateReviewDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateReviewDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateReviewDto.prototype, "text", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateReviewDto.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateReviewDto.prototype, "userId", void 0);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditCollectionMovie = exports.EditCollectionDto = exports.CreateCollectionDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(18);
class CreateCollectionDto {
}
exports.CreateCollectionDto = CreateCollectionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCollectionDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCollectionDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCollectionDto.prototype, "privateCollection", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCollectionDto.prototype, "userId", void 0);
class EditCollectionDto {
}
exports.EditCollectionDto = EditCollectionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], EditCollectionDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], EditCollectionDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], EditCollectionDto.prototype, "privateCollection", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], EditCollectionDto.prototype, "userId", void 0);
class EditCollectionMovie {
}
exports.EditCollectionMovie = EditCollectionMovie;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], EditCollectionMovie.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], EditCollectionMovie.prototype, "movieId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], EditCollectionMovie.prototype, "collectionId", void 0);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiResponseInterceptor = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const operators_1 = __webpack_require__(24);
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
/* 24 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackendFeaturesActorModule = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(9);
const actor_controller_1 = __webpack_require__(26);
const actor_schema_1 = __webpack_require__(28);
const actor_service_1 = __webpack_require__(27);
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
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorController = void 0;
const tslib_1 = __webpack_require__(4);
const dto_1 = __webpack_require__(15);
const actor_service_1 = __webpack_require__(27);
const common_1 = __webpack_require__(1);
const actor_schema_1 = __webpack_require__(28);
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
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(9);
const actor_schema_1 = __webpack_require__(28);
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
/* 28 */
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


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackendFeaturesReviewModule = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(9);
const common_1 = __webpack_require__(1);
const review_controller_1 = __webpack_require__(30);
const review_service_1 = __webpack_require__(31);
const auth_1 = __webpack_require__(34);
const jwt_1 = __webpack_require__(36);
let BackendFeaturesReviewModule = class BackendFeaturesReviewModule {
};
exports.BackendFeaturesReviewModule = BackendFeaturesReviewModule;
exports.BackendFeaturesReviewModule = BackendFeaturesReviewModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService],
        imports: [mongoose_1.MongooseModule.forRoot('mongodb+srv://elcoAdmin:Admin123Database@clusterlocaldataapi.m0cwagc.mongodb.net/'),
            auth_1.AuthModule,
            jwt_1.JwtModule],
        exports: [review_service_1.ReviewService]
    })
], BackendFeaturesReviewModule);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewController = void 0;
const tslib_1 = __webpack_require__(4);
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_1 = __webpack_require__(1);
const review_service_1 = __webpack_require__(31);
const dto_1 = __webpack_require__(15);
const auth_1 = __webpack_require__(34);
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async getAll(movieId) {
        return this.reviewService.getAll(movieId);
    }
    async getOne(id) {
        return this.reviewService.getOne(id);
    }
    async create(data) {
        return this.reviewService.create(data);
    }
    async update(id, req) {
        return this.reviewService.update(id, req);
    }
    async delete(id, req) {
        return this.reviewService.delete(id, req);
    }
};
exports.ReviewController = ReviewController;
tslib_1.__decorate([
    (0, common_1.Get)('movie/:movieId'),
    tslib_1.__param(0, (0, common_1.Param)('movieId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ReviewController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ReviewController.prototype, "getOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateReviewDto !== "undefined" && dto_1.CreateReviewDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ReviewController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ReviewController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ReviewController.prototype, "delete", null);
exports.ReviewController = ReviewController = tslib_1.__decorate([
    (0, common_1.Controller)('review'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof review_service_1.ReviewService !== "undefined" && review_service_1.ReviewService) === "function" ? _a : Object])
], ReviewController);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewService = void 0;
const tslib_1 = __webpack_require__(4);
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_1 = __webpack_require__(1);
const dist_1 = __webpack_require__(32);
const uuid_1 = __webpack_require__(33);
let ReviewService = class ReviewService {
    constructor(neo4jService) {
        this.neo4jService = neo4jService;
        this.TAG = 'ReviewService';
    }
    // GET All
    async getAll(movieId) {
        common_1.Logger.log(`Get all reviews for movie ID: ${movieId}`, this.TAG);
        const result = await this.neo4jService.read(`
            MATCH (:Movie {id: $movieId})<-[:REVIEWMADEFOR]-(r:Review)<-[:MAKEDREVIEW]-(u:User)
            RETURN r {.id, .title, .text, .rating, .date, userId: u.id, username: u.username}
            `, { movieId });
        return result.records.map((record) => record.get('r'));
    }
    // GET by id
    async getOne(reviewId) {
        common_1.Logger.log(`Get review ${reviewId}`, this.TAG);
        const result = await this.neo4jService.read(`
            MATCH (r:Review {id: $reviewId})<-[:MAKEDREVIEW]-(u:User)
            RETURN r {.id, .title, .text, .rating, .date, userId: u.id, username: u.username}
            `, { reviewId });
        if (result.records.length === 0) {
            throw new Error(`Review with ID ${reviewId} not found`);
        }
        return result.records[0].get('r');
    }
    // POST create
    async create(review) {
        common_1.Logger.log(`Create review`, this.TAG);
        const { title, text, rating } = review;
        const id = (0, uuid_1.v4)();
        const date = new Date().toDateString();
        const createdReview = await this.neo4jService.write(`
            CREATE (r:Review {
                id: $id,
                title: $title,
                text: $text,
                rating: $rating,
                date: $date
            })
            RETURN r {.id, .title, .text, .rating, .date}
            `, { id, title, text, rating, date });
        const newReview = createdReview.records[0]?.get('r');
        if (!newReview) {
            throw new Error('Failed to create review');
        }
        const userId = review.userId;
        const reviewId = newReview.id; // Verander '.Id' naar '.id'
        await this.neo4jService.write(`
            MATCH (u:User), (r:Review)
            WHERE u.id = $userId and r.id = $reviewId
            MERGE (u)-[:MAKEDREVIEW]->(r)
            `, { userId: userId, reviewId: reviewId });
        const movieId = review.movieId;
        await this.neo4jService.write(`
            MATCH (r:Review), (m:Movie)
            WHERE r.id = $reviewId and m.id = $movieId
            MERGE (r)-[:REVIEWMADEFOR]->(m)
            `, { reviewId: reviewId, movieId: movieId });
        return newReview;
    }
    // PUT update
    async update(id, req) {
        common_1.Logger.log(`Update review`, this.TAG);
        const review = req.body;
        const userId = req.user.user_id;
        if (userId === review.userId) {
            const date = new Date().toDateString();
            const result = await this.neo4jService.write(`
                MATCH (r:Review {id: $id})
                RETURN r {.id, .title, .text, .rating, .date }
                `, { id: id });
            if (!result.records[0]) {
                common_1.Logger.debug('User not found');
                return null;
            }
            ;
            const updatedReview = {
                title: review.title,
                text: review.text,
                rating: review.rating,
                date: date
            };
            const updateResult = await this.neo4jService.write(`
                MATCH (r:Review {id: $id})
                SET r += $updatedReview
                RETURN r {.id, .title, .text, .rating, .date} as review
                `, { id: id, updatedReview: updatedReview });
            if (!updateResult.records[0]) {
                throw new Error('Failed to update review');
            }
            ;
            const updatedResult = updateResult.records[0].get('review');
            const updatedReviewInfo = {
                id: updatedResult.id,
                title: updatedResult.title,
                text: updatedResult.text,
                rating: updatedResult.rating,
                date: updatedResult.date,
                userId: review.userId
            };
            return updatedReviewInfo;
        }
        throw new common_1.UnauthorizedException();
    }
    // DELETE
    async delete(id, req) {
        common_1.Logger.log('delete', this.TAG);
        const userThatDeleted = req.body;
        const userId = req.user.user_id;
        if (userThatDeleted.userId === userId) {
            const deleteResult = await this.neo4jService.write(`
                MATCH (r:Review {id: $id})
                DETACH DELETE r
                `, { id: id });
            const containsUpdates = deleteResult.summary.updateStatistics.containsUpdates();
            if (!containsUpdates) {
                common_1.Logger.debug('Failed to delete review');
                throw new Error('Failed to delete review');
            }
            return 'Success';
        }
        throw new common_1.UnauthorizedException();
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof dist_1.Neo4jService !== "undefined" && dist_1.Neo4jService) === "function" ? _a : Object])
], ReviewService);


/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = require("nest-neo4j/dist");

/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(53), exports);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(36);
const user_1 = __webpack_require__(37);
const auth_controller_1 = __webpack_require__(42);
const auth_service_1 = __webpack_require__(43);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            user_1.UserModule,
            jwt_1.JwtModule.register({
                secret: process.env['JWT_SECRET'] || 'secretstring',
                signOptions: { expiresIn: '12 days' }
            })
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const user_controller_1 = __webpack_require__(39);
const user_service_1 = __webpack_require__(40);
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const common_2 = __webpack_require__(1);
const user_service_1 = __webpack_require__(40);
const dto_1 = __webpack_require__(15);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findOne(userid) {
        return this.userService.findById(userid);
    }
    async update(userid, data) {
        return this.userService.update(userid, data);
    }
    async follow(userid, followuserid) {
        return this.userService.follow(userid, followuserid);
    }
    async unfollow(userid, unfollowuserid) {
        return this.userService.unfollow(userid, unfollowuserid);
    }
    async getFollowers(userid) {
        return this.userService.getFollowers(userid);
    }
    async getFollowing(userid) {
        return this.userService.getFollowing(userid);
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_2.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_2.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof dto_1.UpdateUserDto !== "undefined" && dto_1.UpdateUserDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Put)(':userid/follow/:followuserid'),
    tslib_1.__param(0, (0, common_2.Param)('userid')),
    tslib_1.__param(1, (0, common_2.Param)('followuserid')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserController.prototype, "follow", null);
tslib_1.__decorate([
    (0, common_1.Put)(':userid/unfollow/:unfollowuserid'),
    tslib_1.__param(0, (0, common_2.Param)('userid')),
    tslib_1.__param(1, (0, common_2.Param)('unfollowuserid')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserController.prototype, "unfollow", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/followers'),
    tslib_1.__param(0, (0, common_2.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UserController.prototype, "getFollowers", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/following'),
    tslib_1.__param(0, (0, common_2.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserController.prototype, "getFollowing", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, common_2.Controller)('user'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UserService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const nest_neo4j_1 = __webpack_require__(14);
let UserService = UserService_1 = class UserService {
    constructor(neo4jService) {
        this.neo4jService = neo4jService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async findById(id) {
        this.logger.log(`Finding user with id ${id}`);
        const item = await this.neo4jService.read(`
            MATCH (u:User { id: $id })
            RETURN u {.id, .username, .birthdate, .country, .description} as user
        `, { id }); // Voeg de id toe als parameter in het query-object
        if (!item.records[0]) {
            this.logger.debug('User not found');
            return null;
        }
        console.log(item.records[0]);
        const result = item.records[0];
        const resultProperties = result.get('user');
        const user = {
            id: resultProperties.id,
            username: resultProperties.username,
            birthdate: resultProperties.birthdate,
            country: resultProperties.country,
            description: resultProperties.description
        };
        return user;
    }
    async update(id, user) {
        this.logger.log(`Update user ${user.username}`);
        const result = await this.neo4jService.write(`
            MATCH (u:User { id: $id })
            RETURN u {.id, .username, .password, .birthdate, .country, .description} as user
            `, { id });
        if (!result.records[0]) {
            this.logger.debug('User not found');
            return null;
        }
        const existingResult = result.records[0].get('user');
        const existingUser = {
            id: existingResult.id,
            username: existingResult.username,
            password: existingResult.password,
            birthdate: existingResult.birthdate,
            country: existingResult.country,
            description: existingResult.description,
        };
        const updatedUser = {
            username: user.username,
            password: user.password || existingUser.password,
            description: user.description || existingUser.description,
        };
        const updateResult = await this.neo4jService.write(`
            MATCH (u:User { id: $id })
            SET u += $updatedUser
            RETURN u {.id, .username, .birthdate, .country, .description} as user
            `, { id, updatedUser });
        if (!updateResult.records[0]) {
            throw new Error('Failed to update user');
        }
        const updatedResult = updateResult.records[0].get('user');
        const updatedUserInfo = {
            id: updatedResult.id,
            username: updatedResult.username,
            password: updatedResult.password,
            birthdate: updatedResult.birthdate,
            country: updatedResult.country,
            description: updatedResult.description,
        };
        return updatedUserInfo;
    }
    async follow(userId, followUserId) {
        this.logger.log(`User ${userId} follows user ${followUserId}`);
        const result = await this.neo4jService.write(`
            MATCH (u:User), (f:User)
            WHERE u.id = $userId AND f.id = $followUserId
            MERGE (u)-[:FOLLOWS]->(f)
            `, { userId, followUserId });
        const containsUpdates = result.summary.updateStatistics.containsUpdates();
        if (!containsUpdates) {
            this.logger.debug('Failed to follow user');
            return 'Failed';
        }
        return 'Succes';
    }
    async unfollow(userId, followUserId) {
        this.logger.log(`User ${userId} unfollows user ${followUserId}`);
        const result = await this.neo4jService.write(`
            MATCH (u:User)-[r:FOLLOWS]->(f:User)
            WHERE u.id = $userId AND f.id = $followUserId
            DELETE r
            `, { userId, followUserId });
        const containsUpdates = result.summary.updateStatistics.containsUpdates();
        if (!containsUpdates) {
            this.logger.debug('Failed to unfollow user');
            return 'Failed';
        }
        return 'Succes';
    }
    async getFollowers(userId) {
        this.logger.log(`Getting followers for user with ID ${userId}`);
        const result = await this.neo4jService.read(`
            MATCH (u:User)-[:FOLLOWS]->(follower:User)
            WHERE follower.id = $userId
            RETURN u.id AS id, u.username AS username, u.birthdate AS birthdate, u.country AS country, u.description AS description
            `, { userId });
        const followers = result.records.map((record) => ({
            id: record.get('id'),
            username: record.get('username'),
            birthdate: record.get('birthdate'),
            country: record.get('country'),
            description: record.get('description'),
        }));
        return followers;
    }
    async getFollowing(userId) {
        this.logger.log(`Getting users followed by user with ID ${userId}`);
        const result = await this.neo4jService.read(`
            MATCH (u:User)-[:FOLLOWS]->(following:User)
            WHERE u.id = $userId
            RETURN following.id AS id, following.username AS username, following.birthdate AS birthdate, following.country AS country, following.description AS description
            `, { userId });
        const following = result.records.map((record) => ({
            id: record.get('id'),
            username: record.get('username'),
            birthdate: record.get('birthdate'),
            country: record.get('country'),
            description: record.get('description'),
        }));
        return following;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nest_neo4j_1.Neo4jService !== "undefined" && nest_neo4j_1.Neo4jService) === "function" ? _a : Object])
], UserService);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserExistsGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const nest_neo4j_1 = __webpack_require__(14);
let UserExistsGuard = class UserExistsGuard {
    constructor(neo4jService) {
        this.neo4jService = neo4jService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.body;
        const username = user.username;
        if (!username) {
            return false; // Voeg een logica toe voor het geval de gebruikersnaam niet is gevonden
        }
        const userResult = await this.neo4jService.read(`
            MATCH (u:User {username: $username})
            RETURN u {.id, .username}
        `, { username });
        return !!userResult;
    }
};
exports.UserExistsGuard = UserExistsGuard;
exports.UserExistsGuard = UserExistsGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nest_neo4j_1.Neo4jService !== "undefined" && nest_neo4j_1.Neo4jService) === "function" ? _a : Object])
], UserExistsGuard);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthController_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const dto_1 = __webpack_require__(15);
const auth_service_1 = __webpack_require__(43);
const api_1 = __webpack_require__(44);
const decorators_1 = __webpack_require__(52);
const user_1 = __webpack_require__(37);
let AuthController = AuthController_1 = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async login(credentials) {
        this.logger.log('Login');
        return await this.authService.login(credentials);
    }
    async register(user) {
        this.logger.log('Register');
        return await this.authService.register(user);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof api_1.IUserCredentials !== "undefined" && api_1.IUserCredentials) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(user_1.UserExistsGuard),
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateUserDto !== "undefined" && dto_1.CreateUserDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = AuthController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(36);
const nest_neo4j_1 = __webpack_require__(14);
const uuid_1 = __webpack_require__(33);
let AuthService = AuthService_1 = class AuthService {
    constructor(neo4jService, jwtService) {
        this.neo4jService = neo4jService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(credentials) {
        this.logger.log('validateUser');
        const username = credentials.username;
        const userResult = await this.neo4jService.read(`
            MATCH (u:User {username: $username})
            RETURN u {.id, .username, .password, .birthdate, .country, .description}
            `, { username });
        const user = userResult.records[0]?.get('u');
        if (user && user.password === credentials.password) {
            return user;
        }
        return null;
    }
    async login(credentials) {
        this.logger.log('login ' + credentials.username);
        const username = credentials.username;
        try {
            const user = await this.neo4jService.read(`
                MATCH (u:User {username: $username})
                RETURN u
                `, { username });
            const result = user.records[0];
            if (result && result.get('u').properties.password === credentials.password) {
                const userProperties = result.get('u').properties;
                const payload = {
                    user_id: userProperties.id // Using identity as the ID
                };
                const userIdentity = {
                    id: userProperties.id,
                    username: userProperties.username,
                    password: userProperties.password,
                    role: userProperties.role,
                    token: this.jwtService.sign(payload)
                };
                return userIdentity;
            }
            else {
                const errMsg = 'Email not found or password invalid';
                this.logger.debug(errMsg);
                throw new common_1.UnauthorizedException(errMsg);
            }
        }
        catch (error) {
            this.logger.error('Error occurred during login: ', error);
            throw new common_1.UnauthorizedException('Error occurred during login');
        }
    }
    async register(user) {
        this.logger.log(`Register user ${user.username}`);
        const { username, password, birthdate, country, description, role } = user;
        const userResult = await this.neo4jService.read(`MATCH (u:User {username: $username})
            RETURN u {.id, .username, .password, .birthdate, .country, .description}`, { username });
        const existingUser = userResult.records[0]?.get('u');
        if (existingUser) {
            this.logger.debug('User exists');
            throw new common_1.ConflictException('User already exists');
        }
        this.logger.debug('User not found, creating');
        const id = (0, uuid_1.v4)();
        const createdUser = await this.neo4jService.write(`
            CREATE (u:User {
                id: $id,
                username: $username,
                password: $password,
                birthdate: $birthdate,
                country: $country,
                description: $description,
                role: 'Guest'
            })
            RETURN u {.id, .username, .password, .birthdate, .country, .description, .role}
            `, { id, username, password, birthdate, country, description, role });
        const newUser = createdUser.records[0]?.get('u');
        if (!newUser) {
            throw new Error('Failed to create user');
        }
        return newUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nest_neo4j_1.Neo4jService !== "undefined" && nest_neo4j_1.Neo4jService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(45), exports);
tslib_1.__exportStar(__webpack_require__(46), exports);
tslib_1.__exportStar(__webpack_require__(47), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);
tslib_1.__exportStar(__webpack_require__(51), exports);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Language = exports.Genre = void 0;
var Genre;
(function (Genre) {
    Genre["Action"] = "Action";
    Genre["Adventure"] = "Adventure";
    Genre["Comedy"] = "Comedy";
    Genre["Crime"] = "Crime";
    Genre["Drama"] = "Drama";
    Genre["Fantasy"] = "Fantasy";
    Genre["Horror"] = "Horror";
    Genre["Scifi"] = "Sci-Fi";
    Genre["War"] = "War";
})(Genre || (exports.Genre = Genre = {}));
var Language;
(function (Language) {
    Language["English"] = "English";
    Language["Dutch"] = "Dutch";
    Language["Japanese"] = "Japanese";
})(Language || (exports.Language = Language = {}));


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nationality = void 0;
var Nationality;
(function (Nationality) {
    Nationality["English"] = "English";
    Nationality["American"] = "American";
    Nationality["Dutch"] = "Dutch";
    Nationality["NewZealand"] = "New Zealand";
    Nationality["Swedish"] = "Swedish";
    Nationality["Australian"] = "Australian";
})(Nationality || (exports.Nationality = Nationality = {}));


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Guest"] = "Guest";
    UserRole["Admin"] = "Admin";
    UserRole["Unknown"] = "Unknown";
})(UserRole || (exports.UserRole = UserRole = {}));


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(1);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthGuard_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(36);
let AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            this.logger.log('No token found');
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env['JWT_SECRET'] || 'secretstring'
            });
            this.logger.log('payload', payload);
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = AuthGuard_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthGuard);


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackendFeaturesCollectionModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(36);
const auth_1 = __webpack_require__(34);
const collection_controller_1 = __webpack_require__(55);
const collection_service_1 = __webpack_require__(56);
let BackendFeaturesCollectionModule = class BackendFeaturesCollectionModule {
};
exports.BackendFeaturesCollectionModule = BackendFeaturesCollectionModule;
exports.BackendFeaturesCollectionModule = BackendFeaturesCollectionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [collection_controller_1.CollectionController],
        providers: [collection_service_1.CollectionService],
        imports: [
            auth_1.AuthModule,
            jwt_1.JwtModule
        ],
        exports: [collection_service_1.CollectionService]
    })
], BackendFeaturesCollectionModule);


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollectionController = void 0;
const tslib_1 = __webpack_require__(4);
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_1 = __webpack_require__(1);
const collection_service_1 = __webpack_require__(56);
const dto_1 = __webpack_require__(15);
const auth_1 = __webpack_require__(34);
let CollectionController = class CollectionController {
    constructor(collectionService) {
        this.collectionService = collectionService;
    }
    async getAllByUSer(id) {
        return this.collectionService.getAllByUser(id);
    }
    async getOne(id) {
        return this.collectionService.getOne(id);
    }
    async getListsWithoutMovie(id) {
        return this.collectionService.getListsWithoutMovie(id);
    }
    async getMovieIdsOfCollection(id) {
        return this.collectionService.getMovieIdsOfCollection(id);
    }
    async create(data) {
        return this.collectionService.create(data);
    }
    async update(id, req) {
        return this.collectionService.update(id, req);
    }
    async delete(id, req) {
        return this.collectionService.delete(id, req);
    }
    async addToCollection(req) {
        return this.collectionService.addToCollection(req);
    }
    async removeFromCollection(req) {
        return this.collectionService.RemoveFromCollection(req);
    }
};
exports.CollectionController = CollectionController;
tslib_1.__decorate([
    (0, common_1.Get)('user/:id'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CollectionController.prototype, "getAllByUSer", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CollectionController.prototype, "getOne", null);
tslib_1.__decorate([
    (0, common_1.Get)('without/:id'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CollectionController.prototype, "getListsWithoutMovie", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/movies'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CollectionController.prototype, "getMovieIdsOfCollection", null);
tslib_1.__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof dto_1.CreateCollectionDto !== "undefined" && dto_1.CreateCollectionDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CollectionController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CollectionController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], CollectionController.prototype, "delete", null);
tslib_1.__decorate([
    (0, common_1.Put)('movies/add'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], CollectionController.prototype, "addToCollection", null);
tslib_1.__decorate([
    (0, common_1.Put)('movies/remove'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], CollectionController.prototype, "removeFromCollection", null);
exports.CollectionController = CollectionController = tslib_1.__decorate([
    (0, common_1.Controller)('collection'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof collection_service_1.CollectionService !== "undefined" && collection_service_1.CollectionService) === "function" ? _a : Object])
], CollectionController);


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollectionService = void 0;
const tslib_1 = __webpack_require__(4);
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_1 = __webpack_require__(1);
const dist_1 = __webpack_require__(32);
const uuid_1 = __webpack_require__(33);
let CollectionService = class CollectionService {
    constructor(neo4jService) {
        this.neo4jService = neo4jService;
        this.TAG = 'CollectionService';
    }
    // Get All by user
    async getAllByUser(userId) {
        common_1.Logger.log(`Get all collections by user`, this.TAG);
        const result = await this.neo4jService.write(`
            MATCH (u:User { id: $userId })-[:MAKEDCOLLECTION]->(c:Collection)
            RETURN c {.id, .name, .description, .privateCollection, .createDate, .updatedDate}
            `, { userId });
        const collections = result.records.map((record) => record.get('c'));
        return collections;
    }
    // Get by id
    async getOne(collectionId) {
        common_1.Logger.log(`Get collection by id`, this.TAG);
        const result = await this.neo4jService.write(`
            MATCH (c:Collection { id: $collectionId })
            RETURN c {.id, .name, .description, .privateCollection, .createDate, .updatedDate}
            `, { collectionId });
        if (result.records.length === 0) {
            throw new Error(`Review with ID ${collectionId} not found`);
        }
        return result.records[0]?.get('c');
    }
    // Get list where movie doesn't is included
    async getListsWithoutMovie(movieId) {
        common_1.Logger.log(`Get collections without movie ${movieId}`, this.TAG);
        const result = await this.neo4jService.write(`
            MATCH (c:Collection)
            WHERE NOT (c)-[:CONTAINS]->(:Movie { id: $movieId })
            RETURN c {.id, .name, .description, .privateCollection, .createDate, .updatedDate}
            `, { movieId });
        const collections = result.records.map((record) => record.get('c'));
        return collections;
    }
    async getMovieIdsOfCollection(collectionId) {
        common_1.Logger.log(`Get movie IDs of collection ${collectionId}`, this.TAG);
        const result = await this.neo4jService.write(`
            MATCH (c:Collection { id: $collectionId })-[:CONTAINS]->(m:Movie)
            RETURN COLLECT(m.id) AS movieIds
            `, { collectionId });
        return result.records[0]?.get('movieIds') ?? [];
    }
    // Post create
    async create(collection) {
        common_1.Logger.log(`Create collection`, this.TAG);
        const { name, description, privateCollection } = collection;
        const id = (0, uuid_1.v4)();
        const createDate = new Date().toDateString();
        const createdCollection = await this.neo4jService.write(`
            CREATE (c:Collection {
                id: $id,
                name: $name,
                description: $description,
                private: $privateCollection,
                createDate: $createDate,
                updatedDate: $createDate
            })
            return c {.id, .name, .description, .private, .createDate, .updatedDate}
            `, { id, name, description, privateCollection, createDate });
        const newCollection = createdCollection.records[0]?.get('c');
        if (!newCollection) {
            throw new Error('Failed to create review');
        }
        const userId = collection.userId;
        const collectionId = newCollection.id;
        await this.neo4jService.write(`
            MATCH (u:User), (c:Collection)
            WHERE u.id = $userId and c.id = $collectionId
            MERGE (u)-[:MAKEDCOLLECTION]->(c)
            `, { userId: userId, collectionId: collectionId });
        return newCollection;
    }
    // Put update
    async update(id, req) {
        common_1.Logger.log(`Update collection`, this.TAG);
        const collection = req.body;
        const userId = req.user.user_id;
        common_1.Logger.debug(userId, collection.userId);
        if (userId === collection.userId) {
            const updatedDate = new Date().toDateString();
            const result = await this.neo4jService.write(`
                MATCH (c:Collection {id: $id})
                RETURN c {.id, .name, .description, .privateCollection, .createDate, .updatedDate}
                `, { id: id });
            if (!result.records[0]) {
                common_1.Logger.debug('Collection not found');
                return null;
            }
            ;
            const updatedCollection = {
                name: collection.name,
                description: collection.description,
                privateCollection: collection.privateCollection,
                updatedDate: updatedDate
            };
            const updateResult = await this.neo4jService.write(`
                MATCH (c:Collection {id: $id})
                SET c += $updatedCollection
                RETURN c {.id, .name, .description, .privateCollection, .createDate, .updatedDate}
                `, { id: id, updatedCollection: updatedCollection });
            if (!updateResult.records[0]) {
                throw new Error('Failed to update collection');
            }
            ;
            const updatedResult = updateResult.records[0].get('c');
            const updatedCollectionInfo = {
                id: updatedResult.id,
                name: updatedResult.name,
                description: updatedResult.description,
                privateCollection: updatedResult.privateCollection,
                createDate: updatedResult.createDate,
                updatedDate: updatedResult.updatedDate
            };
            return updatedCollectionInfo;
        }
        throw new common_1.UnauthorizedException();
    }
    // Delete
    async delete(id, req) {
        common_1.Logger.log('delete', this.TAG);
        const collectionThatDeleted = req.body;
        const userId = req.user.user_id;
        if (collectionThatDeleted.userId === userId) {
            const deleteResult = await this.neo4jService.write(`
                MATCH (c:Collection {id: $id})
                DETACH DELETE c
                `, { id: id });
            const containsUpdates = deleteResult.summary.updateStatistics.containsUpdates();
            if (!containsUpdates) {
                common_1.Logger.debug('Failed to delete collection');
                throw new Error('Failed to delete collection');
            }
            return 'Success';
        }
        throw new common_1.UnauthorizedException();
    }
    async addToCollection(req) {
        const data = req.body;
        const userIdLoggedInUser = req.user.user_id;
        common_1.Logger.log(`User ${data.userId} puts movie ${data.movieId} to collection ${data.collectionId}`, this.TAG);
        const userId = data.userId;
        const movieId = data.movieId;
        const collectionId = data.collectionId;
        if (userIdLoggedInUser === userId) {
            const result = await this.neo4jService.write(`
                MATCH (c:Collection), (m:Movie)
                WHERE c.id = $collectionId AND m.id = $movieId
                MERGE (c)-[:CONTAINS]->(m)
                `, { collectionId, movieId });
            const containsUpdates = result.summary.updateStatistics.containsUpdates();
            if (!containsUpdates) {
                common_1.Logger.debug('Failed to contain movie');
                return 'Failed';
            }
            return 'Succes';
        }
        throw new common_1.UnauthorizedException();
    }
    async RemoveFromCollection(req) {
        const data = req.body;
        const userIdLoggedInUser = req.user.user_id;
        common_1.Logger.log(`User ${data.userId} removes movie ${data.movieId} from collection ${data.collectionId}`, this.TAG);
        const userId = data.userId;
        const movieId = data.movieId;
        const collectionId = data.collectionId;
        if (userIdLoggedInUser === userId) {
            const result = await this.neo4jService.write(`
                MATCH (c:Collection)-[r:CONTAINS]->(m:Movie)
                WHERE c.id = $collectionId AND m.id = $movieId
                DELETE r
                `, { collectionId, movieId });
            const containsUpdates = result.summary.updateStatistics.containsUpdates();
            if (!containsUpdates) {
                common_1.Logger.debug('Failed to remove movie');
                return 'Failed';
            }
            return 'Succes';
        }
        throw new common_1.UnauthorizedException();
    }
};
exports.CollectionService = CollectionService;
exports.CollectionService = CollectionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof dist_1.Neo4jService !== "undefined" && dist_1.Neo4jService) === "function" ? _a : Object])
], CollectionService);


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
const dto_1 = __webpack_require__(15);
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