<?php

namespace App\Console\Commands;

use App\Console\Commands\Enums\Exchange;
use App\Console\Commands\Enums\Queue;
use Illuminate\Console\Command;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Exchange\AMQPExchangeType;
use PhpAmqpLib\Message\AMQPMessage;

class PublishCommand extends Command
{
    private const DEFAULT_VALUE = 'some default value';
    private const ARGUMENT_SEND_DATA = 'send-data';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rabbitmq:publish {send-data?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish RabbitMQ message';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $data = $this->argument(self::ARGUMENT_SEND_DATA) ?: self::DEFAULT_VALUE;

        $connection = app(AMQPStreamConnection::class);
        $channel = $connection->channel();

        $channel->exchange_declare(Exchange::LARAVEL, AMQPExchangeType::FANOUT, false, true, false);
        $channel->queue_declare(Queue::LARAVEL, false, true, false, false);
        $channel->queue_bind(Queue::LARAVEL, Exchange::LARAVEL);

        $msg = new AMQPMessage($data, ['delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT]);
        $channel->basic_publish($msg, 'laravel');

        echo " [x] Sent '$data'\n";

        $channel->close();
        $connection->close();
    }
}
