import { IContentParser, IParseContext } from './parserService';
import * as types from '../types';
import * as cheerio from 'cheerio';

export default class StandingsParser implements IContentParser {

    public name: string = 'standings';

    parse(context: IParseContext): types.IFantasyStanding[] {
        let result : types.IFantasyStanding[] = [];

        let table = context.selector('tableBody.tableBody:nth-of-type(1)');

        if(table.length === 0) return null;

        let rows = table.children('tr.tableBody').each((index, row) => {
            let standing = this.parseStanding(row);

            if(standing) {
                result.push(standing);
            }
        });

        return result;
    }

    private parseStanding(element : any) : types.IFantasyStanding {

        let id = cheerio('td:nth-of-type(1)', element).text();

        if(!id || id.length === 0 || id.trim().length === 0) return null;

        return {
            team: cheerio('td:nth-of-type(1)', element).text(),
            win: parseInt(cheerio('td:nth-of-type(2)', element).text()),
            loss: parseInt(cheerio('td:nth-of-type(3)', element).text()),
            tie: parseInt(cheerio('td:nth-of-type(4)', element).text()),
            pct: parseInt(cheerio('td:nth-of-type(5)', element).text())
        }
    }
}