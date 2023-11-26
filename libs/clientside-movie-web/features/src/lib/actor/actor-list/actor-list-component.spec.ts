import { Actor } from "@org/backend/features";
import { ActorListComponent } from "./actor-list.component";
import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { ActorService } from "../actor.service";
import { RouterModule } from '@angular/router';

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

describe('ActorListComponent', () => {
    let component: ActorListComponent;

    const actorServiceSpy = {
        list: jest.fn().mockReturnValue(of(testActors))
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActorListComponent],
            imports: [RouterModule.forRoot([])],
            providers: [
                {
                    provide: ActorService,
                    useValue: actorServiceSpy
                }
            ]
        }).compileComponents();
    })

    beforeEach(() => {
        const fixture = TestBed.createComponent(ActorListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create ActorListComponent', () => {
        expect(component).toBeTruthy();
    })

    describe('ngOnInit', () => {
        it('should call list', () => {
            expect(actorServiceSpy.list).toHaveBeenCalled();
        })

        it('should list of actor have value', () => {
            expect(component.actors).toEqual(testActors);
        })
    })
})