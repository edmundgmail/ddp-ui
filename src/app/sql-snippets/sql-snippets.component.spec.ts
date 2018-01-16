import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlSnippetsComponent } from './sql-snippets.component';

describe('SqlSnippetsComponent', () => {
  let component: SqlSnippetsComponent;
  let fixture: ComponentFixture<SqlSnippetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlSnippetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlSnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
