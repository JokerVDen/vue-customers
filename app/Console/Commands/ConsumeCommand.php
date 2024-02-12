<?php

namespace App\Console\Commands;

use App\Console\Commands\Enums\Queue;
use Illuminate\Console\Command;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class ConsumeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rabbitmq:consume';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Consume RabbitMQ message';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        /** @var AMQPStreamConnection $connection */
        $connection = app(AMQPStreamConnection::class);

        $channel = $connection->channel();

        echo " [*] Waiting for messages. To exit press CTRL+C\n";

        $callback = function (AMQPMessage $msg) {
            echo $msg->body . PHP_EOL;
            $msg->ack();
        };

        $channel->basic_consume(Queue::LARAVEL, '', false, false, false, false, $callback);

        try {
            $channel->consume();
        } catch (\Throwable $exception) {
            echo $exception->getMessage();
        }
    }
}
