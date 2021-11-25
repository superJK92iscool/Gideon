import type { SapphireClient } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
import type { Command } from '#types/Util.js';
import { SQLBkup } from '#utils/Util';

export async function run(interaction: CommandInteraction, gideon: SapphireClient): Promise<unknown> {
	void interaction.reply('Performing database backup, please wait...');
	void SQLBkup(gideon);
	return interaction.editReply('Database backup complete! Please check <#622415301144870932>! :white_check_mark:');
}

export const info: Command['info'] = {
	owner: false,
	nsfw: false,
	roles: ['621399916283035658'],
	user_perms: [],
	bot_perms: []
};

export const data: Command['data'] = {
	name: 'bkup',
	description: 'Perform a database backup',
	defaultPermission: true
};
