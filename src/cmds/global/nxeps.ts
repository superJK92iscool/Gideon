import type { SapphireClient } from '@sapphire/framework';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import type { Command } from '#types/Util.js';
import { log } from '#utils/Util';

export async function run(interaction: CommandInteraction, gideon: SapphireClient): Promise<void> {
	const embed = new MessageEmbed().setTitle('__Upcoming Arrowverse episodes:__');

	// eslint-disable-next-line guard-for-in
	for (const show in gideon.show_api_urls) {
		try {
			const ep_info = gideon.cache.nxeps.get(show);
			if (!ep_info) {
				log(`No ep_info for ${show} when calling nxeps!`);
				continue;
			}

			embed.addField(`${ep_info.series_name} ${ep_info.embed.name}`, `${ep_info.embed.value()}`);
		} catch (ex) {
			log(`Error while fetching next episode for "${show}": ${ex}`);
		}
	}

	if (embed.fields.length < 1) return interaction.reply('Failed to fetch episode list, please try again later...');
	return interaction.reply({ embeds: [embed] });
}

export const info: Command['info'] = {
	owner: false,
	nsfw: false,
	roles: [],
	user_perms: [],
	bot_perms: []
};

export const data: Command['data'] = {
	name: 'nxeps',
	description: 'Upcoming Arrowverse episodes',
	defaultPermission: true
};
