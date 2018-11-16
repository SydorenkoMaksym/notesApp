import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NoteService } from "../note.service";
import {Note} from "../notes/notes.component";

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.css']
})
export class ViewSectionComponent implements OnInit {
  section: string;

  notes: Note[];

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
  ) { }

  ngOnInit() {
    this.section = this.route.snapshot.params["name"];
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes(this.section)
      .subscribe(notes => this.notes = notes);
  }

}
