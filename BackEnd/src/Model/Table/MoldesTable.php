<?php
declare(strict_types=1);

namespace App\Model\Table;

use Cake\ORM\Query\SelectQuery;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Moldes Model
 *
 * @method \App\Model\Entity\Molde newEmptyEntity()
 * @method \App\Model\Entity\Molde newEntity(array $data, array $options = [])
 * @method array<\App\Model\Entity\Molde> newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Molde get(mixed $primaryKey, array|string $finder = 'all', \Psr\SimpleCache\CacheInterface|string|null $cache = null, \Closure|string|null $cacheKey = null, mixed ...$args)
 * @method \App\Model\Entity\Molde findOrCreate($search, ?callable $callback = null, array $options = [])
 * @method \App\Model\Entity\Molde patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method array<\App\Model\Entity\Molde> patchEntities(iterable $entities, array $data, array $options = [])
 * @method \App\Model\Entity\Molde|false save(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method \App\Model\Entity\Molde saveOrFail(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method iterable<\App\Model\Entity\Molde>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Molde>|false saveMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Molde>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Molde> saveManyOrFail(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Molde>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Molde>|false deleteMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Molde>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Molde> deleteManyOrFail(iterable $entities, array $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class MoldesTable extends Table
{
    /**
     * Initialize method
     *
     * @param array<string, mixed> $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config): void
    {
        parent::initialize($config);

        $this->setTable('moldes');
        $this->setDisplayField('nome');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator): Validator
    {
        $validator
            ->scalar('nome')
            ->maxLength('nome', 255)
            ->requirePresence('nome', 'create')
            ->notEmptyString('nome');

        $validator
            ->scalar('descricao')
            ->requirePresence('descricao', 'create')
            ->notEmptyString('descricao');

        $validator
            ->decimal('preco')
            ->requirePresence('preco', 'create')
            ->notEmptyString('preco');

        $validator
            ->scalar('imagem')
            ->maxLength('imagem', 255)
            ->requirePresence('imagem', 'create')
            ->notEmptyString('imagem');

        return $validator;
    }
}
