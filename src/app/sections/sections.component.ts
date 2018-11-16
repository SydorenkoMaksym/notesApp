import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SectionService } from "../section.service";

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  sections: Section[];
  activeSection: string;

  @Output()
  sectionChanged: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.getSections();
  }

  showSection(section: Section) {
    this.activeSection = section.title;
    this.sectionChanged.emit(this.activeSection);
  }

  getSections(): void {
    this.sectionService.getSections()
      .subscribe(sections => {
        console.log(this.sections);
        this.sections = sections;
        if(this.activeSection == null && this.sections.length > 0) {
          this.showSection(this.sections[0]);
        }
      });
  }

  addSection(newSection: HTMLInputElement) {
    let title: string = newSection.value;
    if(!title) return;

    if(this.sections.map(s=>s.title).find(t=>t===title)) return;

    const section: Section = { title };
    this.sections.unshift(section);
    this.showSection(section);

    this.sectionService.writeSection(this.sections)
      .subscribe(() => newSection.value = "");
  }

}

export interface Section {
  _id?: string;
  title: string;
}
