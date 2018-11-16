import {Component, Input, OnChanges } from '@angular/core';
import { NoteService} from "../note.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnChanges {
  text: string;
  // section: string = "Work";

  @Input() section: string;

  notes: Note[];

  add() {
    let note = { text: this.text, section: this.section };
    this.noteService.addNote(note)
      .subscribe(() => {
        this.notes.push(note);
        this.text = "";
      });
  }

  remove(idx) {
    this.notes.splice(idx,1);
  }

  constructor(private noteService: NoteService) { }

  ngOnChanges() {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes(this.section)
      .subscribe(notes => this.notes = notes);
  }

}

export interface Note {
  text: string;
}
