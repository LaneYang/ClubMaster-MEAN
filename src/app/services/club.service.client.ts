import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Club } from '../models/club.model.client';

@Injectable()
export class ClubService {

  constructor(private http: Http) { }

  baseUrl = environment.baseUrl;

  createClub(userId: String, club: Club) {
    const url = this.baseUrl + '/api/user/' + userId + '/club';
    return this.http.post(url, club).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  findClubs(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/club';
    return this.http.get(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  findClubByName(clubName: String) {
    const url = this.baseUrl + '/api/clubname/' + clubName;
    return this.http.get(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  findClubById(clubId: String) {
    const url = this.baseUrl + '/api/club/' + clubId;
    return this.http.get(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  updateClub(clubId: String, club: Club) {
    const url = this.baseUrl + '/api/club/' + clubId;
    return this.http.put(url, club).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  deleteClub(clubId: String) {
    const url = this.baseUrl + '/api/club/' + clubId;
    return this.http.delete(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  topClubs() {
    const url = this.baseUrl + '/api/topclubs/';
    return this.http.get(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }
}

