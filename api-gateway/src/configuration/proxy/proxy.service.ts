import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { MessageQueues } from "src/utils/enums/message-queues.enum";

@Injectable()
export class ProxyService {
    
    constructor( private readonly config: ConfigService ){}

    public createClientProxy( messagesQueue : MessageQueues ) : ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.config.get('AMQP_URL')],
                queue: messagesQueue
            }
        });
    }

}