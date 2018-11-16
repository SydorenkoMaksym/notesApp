import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

import { Observable } from "rxjs";

import { Note } from "./notes/notes.component";
import {Section} from "./sections/sections.component";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient
  ) { }

  getNotes(section: string): Observable<Note[]> {
    console.log('get some notes');
    return this.http.get<Note[]>(this.notesUrl, { params: new HttpParams().set('section', section) });
  }

  addNote(note: Note) : Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note);
  }

  private notesUrl = 'http://localhost:8080/notes';
}
