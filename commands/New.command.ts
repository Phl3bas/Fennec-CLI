import { AbstractCommand } from './Abstract.command'
import { CommanderStatic } from 'commander'
import inquirer from 'inquirer'
import { IUserAnswers, questions } from '../lib'
import chalk from 'chalk'

export class NewCommand extends AbstractCommand {
  load(program: CommanderStatic): void {
    program
      .command('new [name]')
      .alias('n')
      .description('Creates a new FennecJS project')
      .option(
        '--directory [directory]',
        'Specify the destination directory for your project'
      )
      .action(async (name: string) => {
        const inputs: any[] = []
        inputs.push({ name: 'name', value: name })
        console.clear()
        console.log(chalk.cyan('FENNECJS Project Setup'))
        console.log(chalk.cyan('____________________\n\n'))
        const { language, packageManager } = questions
        const answers: IUserAnswers = await inquirer.prompt([language, packageManager])

        await this.action.handle(inputs, answers)
      })
  }
}
