import { Actor } from '@org/backend/features';
import { ActorService } from './actor.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CreateActorDto } from '@org/backend/dto';

const testActors: Actor[] = [
  {
    _id: '1',
    name: 'Elco Mussert',
    birthdate: new Date(),
    nationality: 'Dutch',
    photo: 'test.url',
  },
  {
    _id: '2',
    name: 'Freek Mussert',
    birthdate: new Date(),
    nationality: 'Dutch',
    photo: 'test2.url',
  },
];

const newActor: CreateActorDto = {
  name: 'Al Bomgaard',
  birthdate: new Date(),
  nationality: 'American',
  photo: 'test3.url',
};

const updatedActor: Actor = {
  _id: '1',
  name: 'Sanne Bouwsteen',
  birthdate: new Date(),
  nationality: 'Dutch',
  photo: 'test.url',
};

describe('ActorService', () => {
  let service: ActorService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActorService],
    });
    service = TestBed.inject(ActorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create the actor service', () => {
    expect(service).toBeTruthy();
  });

  it('should return actor list', () => {
    service.list().subscribe((res) => {
      expect(res).toEqual(testActors);
    });

    const req = httpMock.expectOne(`${service.endpoint}`);
    expect(req.request.method).toBe('GET');
    req.flush(testActors);
  });

  it('should return actor details', () => {
    service.read('1').subscribe((res) => {
      expect(res).toEqual(testActors[0]);
    });

    const req = httpMock.expectOne(`${service.endpoint}/${testActors[0]._id}`);
    expect(req.request.method).toBe('GET');
    req.flush(testActors[0]);
  });

  it('should create new actor', () => {
    service.create(newActor).subscribe((res) => {
      expect(res).toEqual(newActor);
    });

    const req = httpMock.expectOne(`${service.endpoint}`);
    expect(req.request.method).toBe('POST');
    req.flush(newActor);
  });

  it('should update an actor', () => {
    service.update(updatedActor).subscribe((res) => {
      expect(res).toEqual(updatedActor);
    });

    const req = httpMock.expectOne(`${service.endpoint}/${updatedActor._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedActor);
  });

  it('should delete an actor', () => {
    service.delete(updatedActor._id).subscribe((res) => {
      expect(res).toEqual(updatedActor._id);
    });

    const req = httpMock.expectOne(`${service.endpoint}/${updatedActor._id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(updatedActor._id);
  });
});
