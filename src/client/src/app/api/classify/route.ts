import { NextResponse } from 'next/server';
import amqp from 'amqplib';
import { EXCHANGE_NAME, EXCHANGE_TYPE, QUEUE, ROUTING_KEY_CLASSIFY } from '@/constants/env';


export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const image = formData.get('image');

        if (!image || !(image instanceof File)) {
            return NextResponse.json(
                { error: 'Uma imagem válida é obrigatória.' },
                { status: 400 }
            );
        }

        const buffer = await image.arrayBuffer(); // Converte a imagem para um buffer

        const connection = await amqp.connect(QUEUE);
        const channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });
        channel.publish(EXCHANGE_NAME, ROUTING_KEY_CLASSIFY, Buffer.from(buffer));

        console.log(`Imagem publicada na fila 'team_queue' com ROUTING_KEY_CLASSIFY: ${ROUTING_KEY_CLASSIFY}`);
        await channel.close();
        await connection.close();

        return NextResponse.json(
            { success: true, message: 'Imagem enviada para a fila team_queue.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao publicar imagem:', error);
        return NextResponse.json(
            { error: 'Erro ao publicar imagem.' },
            { status: 500 }
        );
    }
}