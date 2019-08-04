import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [ RouterTestingModule ],
    }).compileComponents();
  }));


  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      return { fixture, app };
    }

    it('should create the app', () => {
      const { app } = setup();
      expect(app).toBeTruthy();
    });

    it(`should have as title 'comodo4client'`, () => {
      const { app } = setup();
      expect(app.title).toEqual('comodo4client');
    });

  });
});
