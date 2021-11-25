import type { CommandInteraction } from 'discord.js';
import type { Command } from '#types/Util.js';
import { fetchJSON } from '#utils/Util';

// eslint-disable-next-line @typescript-eslint/require-await
export async function run(interaction: CommandInteraction): Promise<void> {
	const start = process.hrtime.bigint();

	fetchJSON('https://discord.com/api/v8/gateway').then(
		() => {
			const took = (process.hrtime.bigint() - start) / BigInt('1000000');
			return interaction.reply({
				embeds: [
					{
						title: 'The fastest bot alive!',
						description: `WebSocket ping: ${interaction.client.ws.ping.toFixed(2)} ms\nREST ping: ${took} ms`
					}
				]
			});
		},
		(failed) => {
			console.log(failed);
			return interaction.reply({ content: 'Failed to measure ping!', ephemeral: true });
		}
	);
}

export const info: Command['info'] = {
	owner: false,
	nsfw: false,
	roles: [],
	user_perms: [],
	bot_perms: []
};

export const data: Command['data'] = {
	name: 'ping',
	description: "Gideon's ping",
	defaultPermission: true
};
