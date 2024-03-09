import express from 'express';
import {saveSentEmails , getEmails, DeleteEmails , toggleStarredEmail,moveEmailsToBin } from '../Controller/email-controller.js'


const route=express.Router();
route.post('/save/',saveSentEmails);
route.get('/emails/:type',getEmails)
route.post('/save-draft',saveSentEmails)
route.post('/bin',moveEmailsToBin)
route.post('/starred',toggleStarredEmail)
route.delete('/delete',DeleteEmails)
export default route;
