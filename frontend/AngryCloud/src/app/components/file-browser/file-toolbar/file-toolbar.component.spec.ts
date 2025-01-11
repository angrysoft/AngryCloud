import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileToolbarComponent } from './file-toolbar.component';

describe('FileToolbarComponent', () => {
  let component: FileToolbarComponent;
  let fixture: ComponentFixture<FileToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
