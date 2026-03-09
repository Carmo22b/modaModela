<?php
declare(strict_types=1);

namespace App\Model\Table;

use Cake\ORM\Query\SelectQuery;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Usuarios Model
 *
 * @method \App\Model\Entity\Usuario newEmptyEntity()
 * @method \App\Model\Entity\Usuario newEntity(array $data, array $options = [])
 * @method array<\App\Model\Entity\Usuario> newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Usuario get(mixed $primaryKey, array|string $finder = 'all', \Psr\SimpleCache\CacheInterface|string|null $cache = null, \Closure|string|null $cacheKey = null, mixed ...$args)
 * @method \App\Model\Entity\Usuario findOrCreate($search, ?callable $callback = null, array $options = [])
 * @method \App\Model\Entity\Usuario patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method array<\App\Model\Entity\Usuario> patchEntities(iterable $entities, array $data, array $options = [])
 * @method \App\Model\Entity\Usuario|false save(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method \App\Model\Entity\Usuario saveOrFail(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method iterable<\App\Model\Entity\Usuario>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Usuario>|false saveMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Usuario>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Usuario> saveManyOrFail(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Usuario>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Usuario>|false deleteMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Usuario>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Usuario> deleteManyOrFail(iterable $entities, array $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class UsuariosTable extends Table
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

        $this->setTable('usuarios');
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
            ->maxLength('nome', 100, 'O nome deve ter no máximo 100 caracteres.')
            ->requirePresence('nome', 'create')
            ->notEmptyString('nome');

        $validator
            ->email('email')
            ->maxLength('email', 150, 'O email deve ter no máximo 150 caracteres.')
            ->requirePresence('email', 'create')
            ->notEmptyString('email');

        $validator
            ->scalar('senha')
            ->maxLength('senha', 255, 'A senha deve ter no máximo 255 caracteres.')
            ->requirePresence('senha', 'create')
            ->notEmptyString('senha');

        return $validator;
    }
}
