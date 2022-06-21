import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user';
import { createTournament, deleteTournament, getAllTournaments, getTournament, updateTournament } from '../controllers/tournament';
import { createTeam, deleteTeam, getAllTeams, getTeam, updateTeam } from '../controllers/team';
import { createTeamMember, deleteTeamMember, getAllTeamMembers, getTeamMember, updateTeamMember } from '../controllers/teamMember';
import { createTournamentResult, deleteTournamentResult, getAllTournamentResults, getTournamentResult, updateTournamentResult } from '../controllers/tournamentResult';

const appRoute = () => {
  const router = Router();

  router.post('/users', createUser);
  router.get('/users', getAllUsers);
  router.get('/users/:id', getUser);
  router.put('/users/:id', updateUser);
  router.delete('/users/:id', deleteUser);

  router.post('/teams', createTeam);
  router.get('/teams', getAllTeams);
  router.get('/teams/:id', getTeam);
  router.put('/teams/:id', updateTeam);
  router.delete('/teams/:id', deleteTeam);

  router.post('/tournaments', createTournament);
  router.get('/tournaments', getAllTournaments);
  router.get('/tournaments/:id', getTournament);
  router.put('/tournaments/:id', updateTournament);
  router.delete('/tournaments/:id', deleteTournament);

  router.post('/teammembers', createTeamMember);
  router.get('/teammembers', getAllTeamMembers);
  router.get('/teammembers/:id', getTeamMember);
  router.put('/teammembers/:id', updateTeamMember);
  router.delete('/teammembers/:id', deleteTeamMember);

  router.post('/tournamentresults', createTournamentResult);
  router.get('/tournamentresults', getAllTournamentResults);
  router.get('/tournamentresults/:id', getTournamentResult);
  router.put('/tournamentresults/:id', updateTournamentResult);
  router.delete('/tournamentresults/:id', deleteTournamentResult);

  return router;
};

export { appRoute };